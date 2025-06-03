# =============================================================================
# FILE: app/controllers/prediction_controller.py
# =============================================================================

import numpy as np
from app.models.prediction_model import PredictionLog
from app.utils.model_utils import ModelLoader, validate_features, prepare_features_for_prediction
from app import db

class PredictionController:
    
    @staticmethod
    def predict_cancer_risk(features, model_name='random_forest'):
        """Make cancer risk prediction using specified model"""
        
        # Validate features
        is_valid, message = validate_features(features)
        if not is_valid:
            return {'error': message}, 400
        
        # Get model
        model = ModelLoader.get_model(model_name)
        if model is None:
            available_models = ModelLoader.get_available_models()
            return {
                'error': f'Model "{model_name}" not found',
                'available_models': available_models
            }, 400
        
        try:
            # Prepare features for prediction
            X = prepare_features_for_prediction(features)
            
            # Make prediction
            prediction = model.predict(X)[0]
            probabilities = model.predict_proba(X)[0] if hasattr(model, 'predict_proba') else [0.5, 0.5]
            
            # Format result
            result = 'YES' if prediction == 1 else 'NO'
            confidence = max(probabilities)
            prob_no, prob_yes = probabilities if len(probabilities) == 2 else [0.5, 0.5]
            
            # Log prediction
            log_entry = PredictionLog(
                model_name=model_name,
                input_features=features,
                prediction_result=result,
                confidence_score=float(confidence),
                probability_yes=float(prob_yes),
                probability_no=float(prob_no)
            )
            db.session.add(log_entry)
            db.session.commit()
            
            return {
                'prediction': result,
                'confidence_score': float(confidence),
                'probabilities': {
                    'cancer_risk_yes': float(prob_yes),
                    'cancer_risk_no': float(prob_no)
                },
                'model_used': model_name,
                'log_id': log_entry.id
            }, 200
            
        except Exception as e:
            return {'error': f'Prediction failed: {str(e)}'}, 500
    
    @staticmethod
    def get_prediction_history(limit=100):
        """Get prediction history"""
        try:
            predictions = PredictionLog.query.order_by(
                PredictionLog.timestamp.desc()
            ).limit(limit).all()
            
            return {
                'predictions': [pred.to_dict() for pred in predictions],
                'total_count': PredictionLog.query.count()
            }, 200
            
        except Exception as e:
            return {'error': f'Failed to fetch predictions: {str(e)}'}, 500