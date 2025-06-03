# =============================================================================
# FILE: app/controllers/svg_processor.py
# =============================================================================

import os
import re
from flask import current_app
from werkzeug.utils import secure_filename
from app.controllers.prediction_controller import PredictionController

class SVGProcessor:
    
    @staticmethod
    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'svg'
    
    @staticmethod
    def extract_features_from_svg(svg_content):
        """Extract prediction parameters from SVG content (if embedded)"""
        # Look for embedded feature data in SVG comments or metadata
        features = {}
        
        # Example: Look for XML comments with feature data
        # <!-- FEATURES: {"AGE": 45, "SMOKING": 1, ...} -->
        pattern = r'<!--\s*FEATURES:\s*({[^}]+})\s*-->'
        match = re.search(pattern, svg_content)
        
        if match:
            try:
                import json
                features = json.loads(match.group(1))
            except:
                pass
        
        # Return default features if none found
        if not features:
            features = {
                'GENDER': 1, 'AGE': 50, 'SMOKING': 1, 'YELLOW_FINGERS': 0,
                'ANXIETY': 0, 'PEER_PRESSURE': 0, 'CHRONIC_DISEASE': 0,
                'FATIGUE': 1, 'ALLERGY': 0, 'WHEEZING': 1,
                'ALCOHOL_CONSUMING': 0, 'COUGHING': 1,
                'SHORTNESS_OF_BREATH': 1, 'SWALLOWING_DIFFICULTY': 0
            }
        
        return features
    
    @staticmethod
    def annotate_svg(svg_content, prediction_result):
        """Add prediction result annotation to SVG"""
        
        # Create annotation text
        prediction = prediction_result['prediction']
        confidence = prediction_result['confidence_score']
        model = prediction_result['model_used']
        
        annotation = f"""
    <!-- PREDICTION RESULT -->
    <g id="prediction-annotation" transform="translate(10, 30)">
        <rect x="0" y="0" width="300" height="80" fill="rgba(255,255,255,0.9)" 
              stroke="{'red' if prediction == 'YES' else 'green'}" stroke-width="2" rx="5"/>
        <text x="10" y="20" font-family="Arial" font-size="14" font-weight="bold">
            Cancer Risk Prediction: {prediction}
        </text>
        <text x="10" y="40" font-family="Arial" font-size="12">
            Confidence: {confidence:.2%}
        </text>
        <text x="10" y="60" font-family="Arial" font-size="10" fill="gray">
            Model: {model}
        </text>
    </g>
        """
        
        # Insert annotation before closing </svg> tag
        if '</svg>' in svg_content:
            svg_content = svg_content.replace('</svg>', annotation + '\n</svg>')
        else:
            svg_content += annotation
        
        return svg_content
    
    @staticmethod
    def process_svg_files(files, model_name='random_forest'):
        """Process multiple SVG files"""
        results = []
        
        for file in files:
            if file and SVGProcessor.allowed_file(file.filename):
                try:
                    # Read SVG content
                    svg_content = file.read().decode('utf-8')
                    file.seek(0)  # Reset file pointer
                    
                    # Extract features from SVG
                    features = SVGProcessor.extract_features_from_svg(svg_content)
                    
                    # Make prediction
                    prediction_result, status_code = PredictionController.predict_cancer_risk(
                        features, model_name
                    )
                    
                    if status_code == 200:
                        # Annotate SVG
                        annotated_svg = SVGProcessor.annotate_svg(svg_content, prediction_result)
                        
                        # Save annotated SVG
                        filename = secure_filename(file.filename)
                        annotated_filename = f"annotated_{filename}"
                        filepath = os.path.join(
                            current_app.config['UPLOAD_FOLDER'], 
                            annotated_filename
                        )
                        
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(annotated_svg)
                        
                        results.append({
                            'original_filename': filename,
                            'annotated_filename': annotated_filename,
                            'prediction_result': prediction_result,
                            'features_used': features,
                            'status': 'success'
                        })
                    else:
                        results.append({
                            'original_filename': file.filename,
                            'error': prediction_result.get('error', 'Unknown error'),
                            'status': 'error'
                        })
                        
                except Exception as e:
                    results.append({
                        'original_filename': file.filename,
                        'error': str(e),
                        'status': 'error'
                    })
            else:
                results.append({
                    'original_filename': file.filename if file else 'Unknown',
                    'error': 'Invalid file type. Only SVG files are allowed.',
                    'status': 'error'
                })
        
        return results
