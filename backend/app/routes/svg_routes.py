# =============================================================================
# FILE: app/routes/svg_routes.py
# =============================================================================

from flask import Blueprint, request, jsonify, send_file, current_app
from app.controllers.svg_processor import SVGProcessor
import os

svg_bp = Blueprint('svg', __name__)

@svg_bp.route('/upload_svgs', methods=['POST'])
def upload_svgs():
    """Upload and process multiple SVG files"""
    try:
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
        
        files = request.files.getlist('files')
        model_name = request.form.get('model', 'random_forest')
        
        if not files or all(f.filename == '' for f in files):
            return jsonify({'error': 'No files selected'}), 400
        
        results = SVGProcessor.process_svg_files(files, model_name)
        
        return jsonify({
            'message': f'Processed {len(results)} files',
            'results': results,
            'model_used': model_name
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@svg_bp.route('/download_annotated/<filename>', methods=['GET'])
def download_annotated_svg(filename):
    """Download annotated SVG file"""
    try:
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype='image/svg+xml'
        )
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500
