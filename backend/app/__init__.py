from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Create upload directory
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['ML_MODELS_PATH'], exist_ok=True)
    
    # Register blueprints
    from app.routes.prediction_routes import prediction_bp
    from app.routes.svg_routes import svg_bp
    from app.routes.charts_routes import charts_bp
    
    app.register_blueprint(prediction_bp, url_prefix='/api')
    app.register_blueprint(svg_bp, url_prefix='/api')
    app.register_blueprint(charts_bp, url_prefix='/api')
    
    return app
