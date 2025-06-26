import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPRegressor
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import cross_val_score, GridSearchCV
import joblib
import json
from typing import List, Tuple, Dict, Any, Union
import os
from tqdm import tqdm
import time

class KnapsackMLModel:
    def __init__(self, model_type: str = "rf"):
        """Initialize the ML model for knapsack prediction.
        
        Args:
            model_type: Type of model to use ('rf' for Random Forest, 'gb' for Gradient Boosting, or 'mlp' for Neural Network)
        """
        self.model_type = model_type
        self.scaler = StandardScaler()
        self.max_items = 50  # Maximum number of items to consider
        
        if model_type == "rf":
            self.model = RandomForestClassifier(
                n_estimators=500,  # Increased from 200
                max_depth=40,      # Increased from 30
                min_samples_split=2,
                min_samples_leaf=1,
                max_features='sqrt',
                bootstrap=True,
                oob_score=True,    # Added out-of-bag scoring
                n_jobs=-1,
                random_state=42,
                class_weight='balanced',
                verbose=1
            )
        elif model_type == "gb":
            # Wrap GradientBoostingClassifier with MultiOutputClassifier to handle multi-output
            base_gb = GradientBoostingClassifier(
                n_estimators=300,
                learning_rate=0.1,
                max_depth=8,
                min_samples_split=2,
                min_samples_leaf=1,
                subsample=0.8,
                max_features='sqrt',
                random_state=42,
                verbose=1
            )
            self.model = MultiOutputClassifier(base_gb, n_jobs=-1)
        elif model_type == "mlp":
            self.model = MLPRegressor(
                hidden_layer_sizes=(512, 256, 128),  # Larger network
                activation='relu',
                solver='adam',
                alpha=0.0001,
                batch_size='auto',
                learning_rate='adaptive',
                learning_rate_init=0.001,
                max_iter=3000,  # Increased from 2000
                early_stopping=True,
                validation_fraction=0.1,
                n_iter_no_change=15,  # Increased from 10
                random_state=42,
                verbose=True
            )
        else:
            raise ValueError(f"Unknown model type: {model_type}")
    
    def _prepare_features(self, data: pd.DataFrame) -> np.ndarray:
        """Prepare features for the model with enhanced feature engineering."""
        features = []
        
        for _, row in tqdm(data.iterrows(), total=len(data), desc="Preparing features", leave=False):
            n_items = row['n_items']
            weights = np.array(eval(row['weights']) if isinstance(row['weights'], str) else row['weights'])
            values = np.array(eval(row['values']) if isinstance(row['values'], str) else row['values'])
            capacity = row['capacity']
            
            # Pad weights and values to max_items
            padded_weights = np.pad(weights, (0, self.max_items - len(weights)), 'constant')
            padded_values = np.pad(values, (0, self.max_items - len(values)), 'constant')
            
            # Enhanced feature engineering
            value_weight_ratios = values / weights
            sorted_ratios = np.sort(value_weight_ratios)[::-1]  # Sort descending
            sorted_weights = np.sort(weights)
            sorted_values = np.sort(values)[::-1]  # Sort values descending
            
            # Safely handle top k ratios when n_items < 5
            n_ratios = min(n_items, 5)  # Use at most 5 or as many as available
            best_ratios = sorted_ratios[:n_ratios].tolist()  # Best k ratios
            worst_ratios = sorted_ratios[-(n_ratios):].tolist()  # Worst k ratios
            
            # Pad ratios arrays to always have 5 elements
            best_ratios = best_ratios + [0.0] * (5 - len(best_ratios))
            worst_ratios = worst_ratios + [0.0] * (5 - len(worst_ratios))
            
            # Get top 5 weights and values
            top_weights = sorted_weights[-min(5, n_items):].tolist()
            top_weights = [0.0] * (5 - len(top_weights)) + top_weights
            
            top_values = sorted_values[:min(5, n_items)].tolist()
            top_values = top_values + [0.0] * (5 - len(top_values))
            
            # Calculate additional features
            total_weight = np.sum(weights)
            total_value = np.sum(values)
            capacity_ratio = capacity / total_weight if total_weight > 0 else 1.0
            avg_weight = np.mean(weights)
            avg_value = np.mean(values)
            weight_variance = np.var(weights)
            value_variance = np.var(values)
            
            # Calculate knapsack density (how many items can fit on average)
            density = capacity / avg_weight if avg_weight > 0 else n_items
            
            # Calculate potential value density (value per capacity unit)
            value_density = total_value / capacity if capacity > 0 else total_value
            
            # Calculate correlation between weights and values
            correlation = np.corrcoef(weights, values)[0, 1] if n_items > 1 else 0
            
            # Calculate weight and value skewness
            weight_skew = self._calculate_skewness(weights)
            value_skew = self._calculate_skewness(values)
            ratio_skew = self._calculate_skewness(value_weight_ratios)
            
            # Calculate weight and value kurtosis
            weight_kurtosis = self._calculate_kurtosis(weights)
            value_kurtosis = self._calculate_kurtosis(values)
            ratio_kurtosis = self._calculate_kurtosis(value_weight_ratios)
            
            instance_features = [
                n_items,
                capacity,
                np.mean(weights),
                np.std(weights),
                np.median(weights),
                np.percentile(weights, 25),
                np.percentile(weights, 75),
                np.mean(values),
                np.std(values),
                np.median(values),
                np.percentile(values, 25),
                np.percentile(values, 75),
                total_value,
                total_weight,
                capacity_ratio,  # capacity utilization
                np.max(weights) / np.min(weights) if np.min(weights) > 0 else np.max(weights),  # weight range ratio
                np.max(values) / np.min(values) if np.min(values) > 0 else np.max(values),    # value range ratio
                np.mean(value_weight_ratios),
                np.std(value_weight_ratios),
                np.median(value_weight_ratios),
                np.max(value_weight_ratios),
                np.min(value_weight_ratios),
                # New features
                density,
                value_density,
                correlation,
                weight_variance,
                value_variance,
                weight_skew,
                value_skew,
                ratio_skew,
                weight_kurtosis,
                value_kurtosis,
                ratio_kurtosis,
                # Top values
                *top_weights,
                *top_values,
                # Top k value/weight ratios
                *[float(x) for x in best_ratios],  # Best 5 ratios (padded if needed)
                *[float(x) for x in worst_ratios],  # Worst 5 ratios (padded if needed)
            ]
            
            # Add padded weights and values as features
            instance_features.extend(padded_weights)
            instance_features.extend(padded_values)
            
            features.append(instance_features)
        
        return np.array(features)
    
    def _calculate_skewness(self, data: np.ndarray) -> float:
        """Calculate skewness of a distribution."""
        if len(data) < 3:
            return 0.0
        
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0.0
            
        n = len(data)
        skew = (1/n) * np.sum(((data - mean) / std) ** 3)
        return float(skew)
    
    def _calculate_kurtosis(self, data: np.ndarray) -> float:
        """Calculate kurtosis of a distribution."""
        if len(data) < 4:
            return 0.0
            
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0.0
            
        n = len(data)
        kurt = (1/n) * np.sum(((data - mean) / std) ** 4) - 3  # Excess kurtosis
        return float(kurt)
    
    def _prepare_labels(self, data: pd.DataFrame) -> np.ndarray:
        """Prepare labels for the model."""
        labels = []
        for _, row in tqdm(data.iterrows(), total=len(data), desc="Preparing labels", leave=False):
            selection = eval(row['selection']) if isinstance(row['selection'], str) else row['selection']
            # Pad selection to max_items
            padded_selection = np.pad(selection, (0, self.max_items - len(selection)), 'constant')
            labels.append(padded_selection)
        return np.array(labels)
    
    def _tune_hyperparameters(self, X_train: np.ndarray, y_train: np.ndarray) -> Dict[str, Any]:
        """Tune hyperparameters using grid search."""
        print("\nTuning hyperparameters...")
        
        if self.model_type == "rf":
            param_grid = {
                'n_estimators': [300, 500],
                'max_depth': [30, 40, 50],
                'min_samples_split': [2, 5],
                'min_samples_leaf': [1, 2]
            }
        elif self.model_type == "gb":
            # For MultiOutputClassifier, we need to specify parameters for the base estimator
            param_grid = {
                'estimator__n_estimators': [200, 300],
                'estimator__learning_rate': [0.05, 0.1],
                'estimator__max_depth': [6, 8, 10],
                'estimator__subsample': [0.7, 0.8, 0.9]
            }
        elif self.model_type == "mlp":
            param_grid = {
                'alpha': [0.0001, 0.001],
                'learning_rate_init': [0.001, 0.01]
            }
        
        # Use a smaller subset for grid search to speed it up
        sample_size = min(1000, X_train.shape[0])
        indices = np.random.choice(X_train.shape[0], sample_size, replace=False)
        X_sample = X_train[indices]
        y_sample = y_train[indices]
        
        # Create a copy of the model for grid search
        if self.model_type == "rf":
            model_copy = RandomForestClassifier(
                random_state=42, n_jobs=-1, verbose=0, class_weight='balanced'
            )
        elif self.model_type == "gb":
            base_gb = GradientBoostingClassifier(random_state=42, verbose=0)
            model_copy = MultiOutputClassifier(base_gb, n_jobs=-1)
        elif self.model_type == "mlp":
            model_copy = MLPRegressor(
                hidden_layer_sizes=(256, 128), activation='relu',
                solver='adam', random_state=42, max_iter=100,
                early_stopping=True, validation_fraction=0.1
            )
        
        grid_search = GridSearchCV(
            model_copy, param_grid, cv=3, n_jobs=-1,
            verbose=1, scoring='accuracy' if self.model_type != 'mlp' else 'neg_mean_squared_error'
        )
        
        grid_search.fit(X_sample, y_sample)
        print(f"Best parameters: {grid_search.best_params_}")
        return grid_search.best_params_
    
    def train(self, train_data: pd.DataFrame, val_data: pd.DataFrame, tune_hyperparams: bool = False) -> Dict:
        """Train the model and return metrics."""
        print(f"\nTraining {self.model_type.upper()} model...")
        start_time = time.time()
        
        # Prepare features with progress bar
        X_train = self._prepare_features(train_data)
        X_val = self._prepare_features(val_data)
        
        # Scale features
        print("Scaling features...")
        X_train = self.scaler.fit_transform(X_train)
        X_val = self.scaler.transform(X_val)
        
        # Prepare labels with progress bar
        y_train = self._prepare_labels(train_data)
        y_val = self._prepare_labels(val_data)
        
        # Tune hyperparameters if requested
        if tune_hyperparams:
            best_params = self._tune_hyperparameters(X_train, y_train)
            self.model.set_params(**best_params)
        
        # Skip cross-validation for Gradient Boosting to avoid errors with multi-output
        if self.model_type == "gb":
            print("Skipping cross-validation for Gradient Boosting (multi-output not supported in CV)")
            cv_scores = np.array([0.0, 0.0, 0.0])  # Placeholder
        # Perform cross-validation for other models
        elif self.model_type == "mlp":
            # For MLP, we use MSE for cross-validation
            print("Performing cross-validation...")
            cv_scores = -cross_val_score(self.model, X_train[:1000], y_train[:1000], 
                                       cv=3, n_jobs=-1, scoring='neg_mean_squared_error')
            print(f"Cross-validation MSE scores: {cv_scores}")
            print(f"Mean CV MSE: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
        else:
            print("Performing cross-validation...")
            cv_scores = cross_val_score(self.model, X_train[:1000], y_train[:1000], cv=3, n_jobs=-1)
            print(f"Cross-validation scores: {cv_scores}")
            print(f"Mean CV score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
        
        # Train model
        print("Training final model...")
        if self.model_type == "mlp":
            with tqdm(total=self.model.max_iter, desc="Training epochs") as pbar:
                self.model.fit(X_train, y_train)
                pbar.update(self.model.n_iter_)
        else:
            self.model.fit(X_train, y_train)
        
        # Evaluate
        print("Evaluating model...")
        train_preds = (self.model.predict(X_train) > 0.5).astype(int)  # Threshold at 0.5 for MLP
        val_preds = (self.model.predict(X_val) > 0.5).astype(int)
        
        # Calculate metrics only on non-padded items
        train_metrics = self._calculate_metrics(y_train, train_preds, train_data['n_items'].values)
        val_metrics = self._calculate_metrics(y_val, val_preds, val_data['n_items'].values)
        
        metrics = {
            'train_accuracy': train_metrics['accuracy'],
            'val_accuracy': val_metrics['accuracy'],
            'train_f1': train_metrics['f1'],
            'val_f1': val_metrics['f1'],
            'train_precision': train_metrics['precision'],
            'val_precision': val_metrics['precision'],
            'train_recall': train_metrics['recall'],
            'val_recall': val_metrics['recall'],
            'cv_score_mean': float(cv_scores.mean()),
            'cv_score_std': float(cv_scores.std()),
            'training_time': time.time() - start_time
        }
        
        print(f"\nMetrics for {self.model_type.upper()}:")
        for key, value in metrics.items():
            print(f"{key}: {value:.4f}")
        
        return metrics
    
    def _calculate_metrics(self, y_true: np.ndarray, y_pred: np.ndarray, n_items: np.ndarray) -> Dict:
        """Calculate metrics only on non-padded items."""
        all_true = []
        all_pred = []
        
        for true, pred, n in zip(y_true, y_pred, n_items):
            all_true.extend(true[:n])
            all_pred.extend(pred[:n])
        
        return {
            'accuracy': accuracy_score(all_true, all_pred),
            'f1': f1_score(all_true, all_pred, average='weighted'),
            'precision': precision_score(all_true, all_pred, average='weighted', zero_division=0),
            'recall': recall_score(all_true, all_pred, average='weighted', zero_division=0)
        }
    
    def predict(self, data: pd.DataFrame) -> np.ndarray:
        """Make predictions for new instances."""
        X = self._prepare_features(data)
        X = self.scaler.transform(X)
        predictions = self.model.predict(X)
        
        if self.model_type == "mlp":
            predictions = (predictions > 0.5).astype(int)  # Threshold at 0.5
        
        # Truncate predictions to actual number of items
        n_items = data['n_items'].iloc[0]
        return predictions[0][:n_items]
    
    def save(self, path: str):
        """Save the model and scaler."""
        print(f"\nSaving model to {path}...")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'model_type': self.model_type,
            'max_items': self.max_items
        }, path)
    
    @classmethod
    def load(cls, path: str) -> 'KnapsackMLModel':
        """Load a saved model."""
        saved_data = joblib.load(path)
        instance = cls(model_type=saved_data['model_type'])
        instance.model = saved_data['model']
        instance.scaler = saved_data['scaler']
        instance.max_items = saved_data.get('max_items', 50)
        return instance

def train_and_evaluate_models(train_data_path: str, val_data_path: str):
    """Train and evaluate multiple models and save the best one."""
    print("Loading data...")
    train_data = pd.read_csv(train_data_path)
    val_data = pd.read_csv(val_data_path)
    
    print(f"\nDataset sizes:")
    print(f"Training set: {len(train_data)} instances")
    print(f"Validation set: {len(val_data)} instances")
    
    metrics = {}
    models = {}
    
    # Train Random Forest model
    rf_model = KnapsackMLModel(model_type="rf")
    rf_metrics = rf_model.train(train_data, val_data)
    rf_model.save('knapsack/models/rf_model.pkl')
    metrics["random_forest"] = rf_metrics
    models["random_forest"] = rf_model
    
    # Train Gradient Boosting model
    gb_model = KnapsackMLModel(model_type="gb")
    gb_metrics = gb_model.train(train_data, val_data)
    gb_model.save('knapsack/models/gb_model.pkl')
    metrics["gradient_boosting"] = gb_metrics
    models["gradient_boosting"] = gb_model
    
    # Train Neural Network model
    mlp_model = KnapsackMLModel(model_type="mlp")
    mlp_metrics = mlp_model.train(train_data, val_data)
    mlp_model.save('knapsack/models/mlp_model.pkl')
    metrics["neural_network"] = mlp_metrics
    models["neural_network"] = mlp_model
    
    # Find the best model based on validation F1 score
    best_model_name = max(metrics, key=lambda k: metrics[k]['val_f1'])
    best_model = models[best_model_name]
    
    # Save the best model as the default model
    best_model.save('knapsack/models/best_model.pkl')
    
    # Save metrics
    with open('knapsack/models/training_metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)
    
    print("\nTraining complete! Final metrics:")
    print(json.dumps(metrics, indent=2))
    print(f"\nBest model: {best_model_name}")
    
    return best_model

if __name__ == "__main__":
    train_and_evaluate_models('knapsack/data/train_data.csv', 'knapsack/data/val_data.csv') 