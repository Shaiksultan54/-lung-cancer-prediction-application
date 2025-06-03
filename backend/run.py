"""
Flask Application Entry Point
Run this file to start the Lung Cancer Prediction API server
"""

from app import create_app, db
from app.utils.model_utils import ModelLoader
import os

def initialize_app(app):
    """Initialize the application"""
    print("🚀 Initializing Lung Cancer Prediction API...")
    
    # Create database tables
    with app.app_context():
        db.create_all()
        print("✅ Database tables created")
    
    # Load ML models
    try:
        ModelLoader.load_models()
        available_models = ModelLoader.get_available_models()
        if available_models:
            print(f"✅ Loaded {len(available_models)} ML models: {', '.join(available_models)}")
        else:
            print("⚠️  No ML models found. Run 'python train_models.py' first!")
    except Exception as e:
        print(f"❌ Error loading models: {e}")

# Create Flask app
app = create_app()

# Initialize the app immediately
initialize_app(app)

@app.route('/')
def index():
    """API root endpoint with basic information"""
    available_models = ModelLoader.get_available_models()
    
    return {
        "message": "🫁 Lung Cancer Prediction API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health_check": "/api/health",
            "single_prediction": "/api/predict",
            "bulk_svg_upload": "/api/upload_svgs",
            "prediction_history": "/api/predictions",
            "available_models": "/api/models",
            "charts_data": "/api/charts",
            "basic_stats": "/api/stats"
        },
        "available_models": available_models,
        "features_required": [
            "GENDER", "AGE", "SMOKING", "YELLOW_FINGERS", 
            "ANXIETY", "PEER_PRESSURE", "CHRONIC_DISEASE", 
            "FATIGUE", "ALLERGY", "WHEEZING", 
            "ALCOHOL_CONSUMING", "COUGHING", 
            "SHORTNESS_OF_BREATH", "SWALLOWING_DIFFICULTY"
        ],
        "example_usage": {
            "prediction_request": {
                "url": "/api/predict",
                "method": "POST",
                "body": {
                    "features": {
                        "GENDER": 1,
                        "AGE": 45,
                        "SMOKING": 1,
                        "YELLOW_FINGERS": 0,
                        "ANXIETY": 0,
                        "PEER_PRESSURE": 0,
                        "CHRONIC_DISEASE": 0,
                        "FATIGUE": 1,
                        "ALLERGY": 0,
                        "WHEEZING": 1,
                        "ALCOHOL_CONSUMING": 0,
                        "COUGHING": 1,
                        "SHORTNESS_OF_BREATH": 1,
                        "SWALLOWING_DIFFICULTY": 0
                    },
                    "model": "random_forest"
                }
            }
        }
    }

@app.route('/api')
def api_info():
    """API information endpoint"""
    return {
        "api_name": "Lung Cancer Prediction API",
        "version": "1.0.0",
        "available_endpoints": [
            "GET /api/health - Health check",
            "POST /api/predict - Single prediction",
            "GET /api/models - Available ML models",
            "GET /api/predictions - Prediction history", 
            "POST /api/upload_svgs - Bulk SVG processing",
            "GET /api/download_annotated/<filename> - Download annotated SVG",
            "GET /api/charts - Chart data for visualization",
            "GET /api/stats - Basic statistics"
        ]
    }

if __name__ == '__main__':
    print("="*60)
    print("🫁 LUNG CANCER PREDICTION API")
    print("="*60)
    print("🌐 Starting Flask development server...")
    
    # Check if models exist
    models_dir = 'app/ml_models'
    if not os.path.exists(models_dir) or not os.listdir(models_dir):
        print("\n⚠️  WARNING: No ML models found!")
        print("Please run: python train_models.py")
        print("This will generate sample models for testing.\n")
    
    # Run the Flask app
    try:
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        import traceback
        traceback.print_exc()