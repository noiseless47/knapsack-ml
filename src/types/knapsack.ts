export interface KnapsackItem {
  item_id: number;
  weight: number;
  value: number;
}

export type SolverType = 'all' | 'dp' | 'greedy' | 'ml';

export interface KnapsackRequest {
  weights: number[];
  values: number[];
  capacity: number;
  solver_type: SolverType;
}

export interface KnapsackSolution {
  status: string;
  results: {
    [key: string]: {
      selected_items: number[];
      total_value: number;
      total_weight: number;
      is_feasible: boolean;
      selection: number[];
      solve_time?: number;
    };
  };
  request?: {
    weights: number[];
    values: number[];
    capacity: number;
  };
}

export interface SolverResult {
  selected_items: number[];
  total_value: number;
  total_weight: number;
  is_feasible: boolean;
  selection: number[];
  solve_time?: number;
} 