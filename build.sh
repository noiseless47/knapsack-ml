#!/usr/bin/env bash
# Install dependencies with pre-built wheels
pip install --upgrade pip
pip install --only-binary :all: numpy pandas scikit-learn torch matplotlib seaborn
pip install --only-binary :all: pydantic pydantic-core
pip install -r requirements.txt 