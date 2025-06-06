from setuptools import setup, find_packages

setup(
    name="knapsack",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "numpy",
        "pandas",
        "scikit-learn",
        "fastapi",
        "uvicorn",
        "pydantic<2.0",
        "joblib",
        "tqdm"
    ]
) 