# 🎓 Visual NGSS Interface

A comprehensive web-based interface for exploring and visualizing student concept maps, drawings, and performance data in NGSS (Next Generation Science Standards) assessments.

## 🚀 Features

- **Interactive Topic Browser**: Navigate between different NGSS topics and standards
- **Student Work Visualization**: View student drawings and concept maps
- **Performance Analysis**: Detailed breakdown of student capabilities and areas for improvement
- **Evidence Statements**: Alignment with NGSS evidence statements and learning objectives
- **AI Analysis**: Insights from AI-generated reasoning and educational analysis
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📚 Topics Available

1. **String Telephone Communication** (1-PS4-4)
   - Students 201-300
   - Grade 1: Sound transmission and communication

2. **Animal Habitats** (K-LS1-1)
   - Students 1-100  
   - Kindergarten: Animals in their natural environments

3. **Reversible and Irreversible Changes** (2-PS1-4)
   - Students 1-100
   - Grade 2: Physical and chemical changes

4. **Comparing Two Habitats** (2-LS4-1)
   - Students 1-100
   - Grade 2: Different habitats and their organisms

5. **Plant Growth Requirements** (K-LS1-1)
   - Students 1-100
   - Kindergarten: Plant responses to environmental conditions

## 🖥️ Getting Started

### Option 1: Direct File Access
1. Open `index.html` in your web browser
2. Select a topic from the dropdown menu
3. Browse student work and explore their data

### Option 2: Local Server (Recommended)
1. Start a local HTTP server:
   ```bash
   python -m http.server 8000
   ```
2. Open your browser and navigate to `http://localhost:8000`
3. Start exploring student work!

## 📊 Data Structure

Each student directory contains:
- `drawing.png` - Original student artwork
- `concept_map.svg` - Visual concept map representation  
- `concept_map.json` - Concept map data structure
- `evidence_statements.json` - NGSS evidence statements
- `student_info.txt` - Basic student information
- `student_performance.json` - Performance analysis
- `student_simulation.json` - AI reasoning and analysis

## 🎯 Interface Components

### Topic Overview
- NGSS standard information
- Grade level and student count
- Topic description and objectives

### Student Browser
- Grid view of all students in a topic
- Performance level indicators
- Quick access to individual student data

### Student Details
Comprehensive view with multiple tabs:

1. **📊 Overview**: Quick summary with visual previews
2. **🖼️ Visual Work**: Student drawings and concept maps
3. **📈 Performance**: What students can/cannot do
4. **📋 Evidence**: NGSS evidence statement alignment
5. **🤖 AI Analysis**: Educational insights and reasoning

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: Interactive functionality and data handling
- **Responsive Design**: CSS Grid and Flexbox for all screen sizes

### Browser Compatibility
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers

### File Structure
```
visual_ngss_interface/
├── index.html          # Main interface
├── styles.css          # Comprehensive styling
├── script.js           # Interactive functionality  
├── README.md           # This documentation
└── data/               # Student data directories
    ├── Draw_a_string_telephone_between_two_students/
    ├── Draw_animals_in_their_habitats_with_labels_eg_fish_in_water/
    └── ... (other topics)
```

## 🎨 Features in Detail

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### Accessibility
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast design elements

### Performance
- Lazy loading of student data
- Efficient grid layouts
- Smooth animations and transitions

## 🔮 Future Enhancements

- Real file loading from the data directories
- Advanced filtering and search capabilities
- Data export functionality
- Comparative analysis tools
- Integration with learning management systems
- Advanced concept map interactions

## 📝 Usage Notes

Currently, the interface demonstrates the structure and functionality using sample data. In a production environment, it would:

1. Load actual PNG images from student directories
2. Render SVG concept maps with interactive elements
3. Parse JSON files for real performance data
4. Provide file download capabilities
5. Include advanced analytics and reporting

## 🤝 Contributing

This interface serves as a foundation for educational data visualization. Contributions for enhanced functionality, additional NGSS topics, or improved accessibility are welcome.

## 📄 License

This educational interface is designed for research and educational purposes in NGSS assessment visualization. 