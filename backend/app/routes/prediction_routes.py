# =============================================================================
# FILE: app/routes/prediction_routes.py
# =============================================================================

from flask import Blueprint, request, jsonify
from app.controllers.prediction_controller import PredictionController
from app.utils.model_utils import ModelLoader

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    """Single prediction endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        features = data.get('features', {})
        model_name = data.get('model', 'random_forest')
        
        result, status_code = PredictionController.predict_cancer_risk(features, model_name)
        return jsonify(result), status_code
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@prediction_bp.route('/models', methods=['GET'])
def get_available_models():
    """Get list of available ML models"""
    try:
        models = ModelLoader.get_available_models()
        return jsonify({
            'available_models': models,
            'default_model': 'random_forest'
        }), 200
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@prediction_bp.route('/predictions', methods=['GET'])
def get_predictions():
    """Get prediction history"""
    try:
        limit = request.args.get('limit', 100, type=int)
        result, status_code = PredictionController.get_prediction_history(limit)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@prediction_bp.route('/health', methods=['GET'])
def health_check():
    """API health check"""
    return jsonify({
        'status': 'healthy',
        'message': 'Lung Cancer Prediction API is running',
        'available_models': ModelLoader.get_available_models()
    }), 200