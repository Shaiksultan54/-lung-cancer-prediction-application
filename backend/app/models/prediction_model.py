# =============================================================================
# FILE: app/models/prediction_model.py
# =============================================================================

from app import db
from datetime import datetime
from sqlalchemy import JSON

class PredictionLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    model_name = db.Column(db.String(50), nullable=False)
    input_features = db.Column(JSON, nullable=False)
    prediction_result = db.Column(db.String(20), nullable=False)  # 'YES' or 'NO'
    confidence_score = db.Column(db.Float, nullable=False)
    probability_yes = db.Column(db.Float, nullable=True)
    probability_no = db.Column(db.Float, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'model_name': self.model_name,
            'input_features': self.input_features,
            'prediction_result': self.prediction_result,
            'confidence_score': self.confidence_score,
            'probability_yes': self.probability_yes,
            'probability_no': self.probability_no
        }

