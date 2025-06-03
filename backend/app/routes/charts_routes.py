from flask import Blueprint, jsonify
from app.models.prediction_model import PredictionLog
from app import db  # Add this import
from sqlalchemy import func, desc,case
from datetime import datetime, timedelta

charts_bp = Blueprint('charts', __name__)

@charts_bp.route('/charts', methods=['GET'])
def get_chart_data():
    """Get statistical data for charts and visualization"""
    try:
        # Basic statistics
        total_predictions = PredictionLog.query.count()
        high_risk_count = PredictionLog.query.filter_by(prediction_result='YES').count()
        low_risk_count = PredictionLog.query.filter_by(prediction_result='NO').count()
        
        # Model usage statistics
        model_stats = db.session.query(
            PredictionLog.model_name,
            func.count(PredictionLog.id).label('count')
        ).group_by(PredictionLog.model_name).all()
        
        # Daily predictions (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        daily_stats = db.session.query(
            func.date(PredictionLog.timestamp).label('date'),
            func.count(PredictionLog.id).label('count'),
            # func.sum(func.case([(PredictionLog.prediction_result == 'YES', 1)], else_=0)).label('high_risk'),
            # func.sum(func.case([(PredictionLog.prediction_result == 'NO', 1)], else_=0)).label('low_risk')
            func.sum(case((PredictionLog.prediction_result == 'YES', 1), else_=0)).label('high_risk'),
    func.sum(case((PredictionLog.prediction_result == 'NO', 1), else_=0)).label('low_risk')
        ).filter(
            PredictionLog.timestamp >= thirty_days_ago
        ).group_by(
            func.date(PredictionLog.timestamp)
        ).order_by(desc('date')).all()
        
        # Confidence score distribution
        confidence_ranges = [
            (0.5, 0.6), (0.6, 0.7), (0.7, 0.8), (0.8, 0.9), (0.9, 1.0)
        ]
        confidence_distribution = []
        
        for min_conf, max_conf in confidence_ranges:
            count = PredictionLog.query.filter(
                PredictionLog.confidence_score >= min_conf,
                PredictionLog.confidence_score < max_conf
            ).count()
            confidence_distribution.append({
                'range': f'{min_conf:.1f}-{max_conf:.1f}',
                'count': count
            })
        
        return jsonify({
            'summary': {
                'total_predictions': total_predictions,
                'high_risk_predictions': high_risk_count,
                'low_risk_predictions': low_risk_count,
                'high_risk_percentage': (high_risk_count / total_predictions * 100) if total_predictions > 0 else 0
            },
            'model_usage': [
                {'model': stat.model_name, 'count': stat.count}
                for stat in model_stats
            ],
            'daily_predictions': [
                {
                    'date': datetime.strptime(stat.date, '%Y-%m-%d').isoformat(),
                    'total': stat.count,
                    'high_risk': stat.high_risk,
                    'low_risk': stat.low_risk
                }
                for stat in daily_stats
            ],
            'confidence_distribution': confidence_distribution
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@charts_bp.route('/stats', methods=['GET'])
def get_basic_stats():
    """Get basic statistics"""
    try:
        total = PredictionLog.query.count()
        high_risk = PredictionLog.query.filter_by(prediction_result='YES').count()
        low_risk = PredictionLog.query.filter_by(prediction_result='NO').count()
        
        # Average confidence by prediction type
        avg_confidence_high = db.session.query(
            func.avg(PredictionLog.confidence_score)
        ).filter_by(prediction_result='YES').scalar() or 0
        
        avg_confidence_low = db.session.query(
            func.avg(PredictionLog.confidence_score)
        ).filter_by(prediction_result='NO').scalar() or 0
        
        return jsonify({
            'total_predictions': total,
            'predictions_by_risk': {
                'high_risk': high_risk,
                'low_risk': low_risk
            },
            'risk_percentages': {
                'high_risk_percent': (high_risk / total * 100) if total > 0 else 0,
                'low_risk_percent': (low_risk / total * 100) if total > 0 else 0
            },
            'average_confidence': {
                'high_risk_predictions': round(float(avg_confidence_high), 3),
                'low_risk_predictions': round(float(avg_confidence_low), 3)
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500