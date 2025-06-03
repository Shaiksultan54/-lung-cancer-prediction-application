import joblib
import os
import numpy as np
from flask import current_app

class ModelLoader:
    _models = {}
    
    @classmethod
    def load_models(cls):
        """Load all ML models from the ml_models directory"""
        models_path = current_app.config['ML_MODELS_PATH']
        model_files = {
            'random_forest': 'random_forest_model.pkl',
            'svm': 'svm_model.pkl',
            'knn': 'knn_model.pkl',
            'decision_tree': 'decision_tree_model.pkl'
        }
        
        for model_name, filename in model_files.items():
            file_path = os.path.join(models_path, filename)
            if os.path.exists(file_path):
                try:
                    cls._models[model_name] = joblib.load(file_path)
                    print(f"✅ Loaded {model_name} model")
                except Exception as e:
                    print(f"❌ Failed to load {model_name}: {e}")
            else:
                print(f"⚠️ Model file not found: {file_path}")
    
    @classmethod
    def get_model(cls, model_name):
        """Get a specific model"""
        if not cls._models:
            cls.load_models()
        return cls._models.get(model_name)
    
    @classmethod
    def get_available_models(cls):
        """Get list of available model names"""
        if not cls._models:
            cls.load_models()
        return list(cls._models.keys())

def validate_features(features):
    """Validate input features"""
    required_features = current_app.config['FEATURE_NAMES']
    
    if not isinstance(features, dict):
        return False, "Features must be a dictionary"
    
    if len(features) != len(required_features):
        return False, f"Expected {len(required_features)} features, got {len(features)}"
    
    for feature in required_features:
        if feature not in features:
            return False, f"Missing feature: {feature}"
        
        # Validate feature values (should be 0, 1, or 2 for most features)
        value = features[feature]
        if not isinstance(value, (int, float)) or value < 0:
            return False, f"Invalid value for {feature}: {value}"
    
    return True, "Valid"

def prepare_features_for_prediction(features):
    """Convert features dict to numpy array in correct order"""
    feature_names = current_app.config['FEATURE_NAMES']
    return np.array([[features[name] for name in feature_names]])
