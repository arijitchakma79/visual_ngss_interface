# 🎓 Visual NGSS Interface (For Teachers)

A lightweight, client-side interface for exploring student concept maps, drawings, and performance data related to NGSS (Next Generation Science Standards) assessments.

## ✨ Features 

- 🖼️ **Student Drawings**: View original student artwork and drawings
- 🗺️ **Concept Maps**: Interactive SVG concept maps showing student understanding  
- 📊 **Performance Data**: Detailed analysis of student capabilities and areas for improvement
- 📋 **Evidence Statements**: NGSS-aligned assessment criteria
- 🤖 **AI Analysis**: Simulation data showing AI reasoning about student performance
- ⌨️ **Keyboard Navigation**: Use arrow keys to navigate between students
- 📱 **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Python 3.6 or higher (comes with most modern systems)
- A modern web browser

### Running the Interface

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd visual_ngss_interface
   ```

2. **Start the local server**
   ```bash
   python serve.py
   ```
   
   Or use Python's built-in server directly:
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser**
   - The server will automatically try to open your browser
   - Or manually visit: `http://localhost:8000`

4. **Explore the data**
   - Select a topic from the dropdown
   - Browse student work by clicking "Browse Student Work"
   - Navigate between students using the Previous/Next buttons or arrow keys

## 📁 Project Structure

```
visual_ngss_interface/
├── index.html              # Main interface
├── serve.py                # Simple HTTP server script
├── static/
│   ├── script.js           # JavaScript functionality
│   └── styles.css          # CSS styling
├── data/                   # Student data organized by topic
│   ├── Draw_a_string_telephone_between_two_students/
│   │   ├── student_201/
│   │   │   ├── drawing.png
│   │   │   ├── concept_map.svg
│   │   │   ├── concept_map.json
│   │   │   ├── evidence_statements.json
│   │   │   ├── student_performance.json
│   │   │   ├── student_simulation.json
│   │   │   └── student_info.txt
│   │   └── ... (more students)
│   └── ... (more topics)
└── README.md
```

## 📊 Data Format

Each student folder contains:
- **drawing.png**: Original student artwork
- **concept_map.svg**: Interactive concept map visualization
- **concept_map.json**: Concept map data structure
- **evidence_statements.json**: NGSS evidence statements and alignment
- **student_performance.json**: CAN/CANNOT statements and performance level
- **student_simulation.json**: AI reasoning and analysis
- **student_info.txt**: Basic student and topic information

## 🔧 Topics Available

1. **String Telephone Communication** (Students 201-300)
   - NGSS: 1-PS4-4, Grade 1
   - Focus: Sound transmission and communication

2. **Animal Habitats** (Students 1-100) 
   - NGSS: K-LS1-1, Grade K
   - Focus: Animals in their natural environments

3. **Plant Growth Requirements** (Students 101-200)
   - NGSS: K-LS1-1, Grade K  
   - Focus: Plants and environmental conditions

4. **Reversible and Irreversible Changes** (Students 301-400)
   - NGSS: 2-PS1-4, Grade 2
   - Focus: Physical and chemical changes

5. **Comparing Two Habitats** (Students 401-500)
   - NGSS: 2-LS4-1, Grade 2
   - Focus: Different habitats and organisms

## 🎯 Key Features

### Navigation
- **Previous/Next Buttons**: Navigate between students in sequence
- **Keyboard Shortcuts**: Use ← → arrow keys for quick navigation
- **Student Browser**: Grid view of all students with performance levels

### Data Visualization
- **Real Student Data**: Loads actual JSON files and images
- **Interactive Elements**: Click to view full-size images
- **Tabbed Interface**: Organized view of different data types
- **Responsive Design**: Adapts to different screen sizes

### Performance Analysis
- **CAN/CANNOT Statements**: Clear breakdown of student capabilities
- **Evidence Alignment**: Shows how work aligns with NGSS standards
- **AI Insights**: Computer-generated analysis of student approaches

## 🛠️ Technical Details
