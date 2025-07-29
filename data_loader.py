#!/usr/bin/env python3
import json
from pathlib import Path
from flask import Flask, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Base path for student data
DATA_PATH = Path("data")

# Updated topic configurations
TOPIC_CONFIGS = {
    'Draw_a_string_telephone_between_two_students': {
        'name': 'String Telephone Communication',
        'description': 'Students draw string telephones to demonstrate sound transmission and communication',
        'ngss_code': '1-PS4-4',
        'grade': 1,
        'student_range': [201, 300]
    },
    'Draw_animals_in_their_habitats_with_labels_eg_fish_in_water': {
        'name': 'Animal Habitats',
        'description': 'Students illustrate animals in their natural habitats with proper labeling',
        'ngss_code': 'K-LS1-1',
        'grade': 'K',
        'student_range': [1, 100]
    },
    'Illustrate_plants_with_and_without_water_and_light': {
        'name': 'Plant Growth Requirements',
        'description': 'Students show how plants respond to environmental conditions',
        'ngss_code': 'K-LS1-1',
        'grade': 'K',
        'student_range': [101, 200]
    },
    'Draw_reversible_and_irreversible_changes_ice_melting_vs_egg_cooking': {
        'name': 'Reversible and Irreversible Changes',
        'description': 'Students demonstrate understanding of physical and chemical changes',
        'ngss_code': '2-PS1-4',
        'grade': 2,
        'student_range': [301, 400]
    },
    'Draw_two_habitats_and_the_different_living_things_in_each': {
        'name': 'Comparing Two Habitats',
        'description': 'Students compare different habitats and their living organisms',
        'ngss_code': '2-LS4-1',
        'grade': 2,
        'student_range': [401, 500]
    }
}

def load_student_data(topic, student_id):
    student_path = DATA_PATH / topic / f"student_{student_id}"
    print(f"[DEBUG] Looking for: {student_path}")  # Add this
    if not student_path.exists():
        return None
    
    data = {}
    json_files = ['concept_map.json', 'evidence_statements.json', 'student_performance.json', 'student_simulation.json']
    for json_file in json_files:
        file_path = student_path / json_file
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                data[json_file.replace('.json', '')] = json.load(f)
    
    info_path = student_path / "student_info.txt"
    if info_path.exists():
        with open(info_path, 'r', encoding='utf-8') as f:
            data['student_info'] = f.read()

    return data

@app.route('/api/image/<topic_id>/<int:student_id>/drawing')
def get_student_drawing(topic_id, student_id):
    image_path = DATA_PATH / topic_id / f"student_{student_id}" / "drawing.png"
    print(f"Fetching drawing image: {image_path}")  # Debug log
    if not image_path.exists():
        return "Image not found", 404
    return send_file(image_path, mimetype='image/png')

@app.route('/api/image/<topic_id>/<int:student_id>/concept_map')
def get_student_concept_map(topic_id, student_id):
    svg_path = DATA_PATH / topic_id / f"student_{student_id}" / "concept_map.svg"
    print(f"Fetching concept map: {svg_path}")  # Debug log
    if not svg_path.exists():
        return "SVG not found", 404
    return send_file(svg_path, mimetype='image/svg+xml')
