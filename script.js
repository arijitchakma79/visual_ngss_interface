// Global variables
let currentTopic = '';
let topicData = {};
let currentStudentId = null;
let availableStudents = [];

// Topic configurations
const topicConfigs = {
    'Draw_a_string_telephone_between_two_students': {
        name: 'String Telephone Communication',
        description: 'Students draw string telephones to demonstrate sound transmission and communication',
        ngssCode: '1-PS4-4',
        grade: 1,
        studentRange: [201, 300]
    },
    'Draw_animals_in_their_habitats_with_labels_eg_fish_in_water': {
        name: 'Animal Habitats',
        description: 'Students illustrate animals in their natural habitats with proper labeling',
        ngssCode: 'K-LS1-1',
        grade: 'K',
        studentRange: [1, 100]
    },
    'Draw_reversible_and_irreversible_changes_ice_melting_vs_egg_cooking': {
        name: 'Reversible and Irreversible Changes',
        description: 'Students demonstrate understanding of physical and chemical changes',
        ngssCode: '2-PS1-4',
        grade: 2,
        studentRange: [301, 400]
    },
    'Draw_two_habitats_and_the_different_living_things_in_each': {
        name: 'Comparing Two Habitats',
        description: 'Students compare different habitats and their living organisms',
        ngssCode: '2-LS4-1',
        grade: 2,
        studentRange: [401, 500]
    },
    'Illustrate_plants_with_and_without_water_and_light': {
        name: 'Plant Growth Requirements',
        description: 'Students show how plants respond to environmental conditions',
        ngssCode: 'K-LS1-1',
        grade: 'K',
        studentRange: [101, 200]
    }
};

// Load topic overview
async function loadTopic() {
    const select = document.getElementById('topicSelect');
    const selectedTopic = select.value;
    
    if (!selectedTopic) {
        showWelcomeMessage();
        return;
    }
    
    currentTopic = selectedTopic;
    const config = topicConfigs[selectedTopic];
    
    if (!config) {
        console.error('Topic configuration not found:', selectedTopic);
        return;
    }
    
    showTopicOverview(config);
}

// Show welcome message
function showWelcomeMessage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="welcome-message">
            <h2>🚀 Welcome to the Visual NGSS Interface</h2>
            <p>Select a topic above to begin exploring student work.</p>
            <div class="features">
                <div class="feature">
                    <span class="icon">🖼️</span>
                    <h3>Student Drawings</h3>
                    <p>View original student artwork and drawings</p>
                </div>
                <div class="feature">
                    <span class="icon">🗺️</span>
                    <h3>Concept Maps</h3>
                    <p>Interactive concept maps showing student understanding</p>
                </div>
                <div class="feature">
                    <span class="icon">📊</span>
                    <h3>Performance Data</h3>
                    <p>Detailed analysis of student capabilities and areas for improvement</p>
                </div>
            </div>
        </div>
    `;
}

// Show topic overview
function showTopicOverview(config) {
    const content = document.getElementById('content');
    const totalStudents = config.studentRange[1] - config.studentRange[0] + 1;
    
    content.innerHTML = `
        <div class="topic-overview">
            <div class="topic-header">
                <h2>${config.name}</h2>
                <p>${config.description}</p>
                <div class="topic-info">
                    <div class="info-item">
                        <strong>NGSS Standard:</strong>
                        ${config.ngssCode}
                    </div>
                    <div class="info-item">
                        <strong>Grade Level:</strong>
                        ${config.grade}
                    </div>
                    <div class="info-item">
                        <strong>Students:</strong>
                        ${totalStudents} submissions
                    </div>
                    <div class="info-item">
                        <strong>Range:</strong>
                        Student ${config.studentRange[0]} - ${config.studentRange[1]}
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="browse-students-btn" onclick="showStudentBrowser()">
                    📚 Browse Student Work
                </button>
            </div>
        </div>
    `;
}

// Show student browser modal
function showStudentBrowser() {
    const modal = document.getElementById('studentModal');
    const config = topicConfigs[currentTopic];
    
    if (!config) return;
    
    const studentGrid = document.getElementById('studentGrid');
    studentGrid.innerHTML = '<div class="loading">Loading students...</div>';
    
    modal.style.display = 'block';
    
    // Generate student cards
    setTimeout(() => {
        // Populate available students array
        availableStudents = [];
        for (let i = config.studentRange[0]; i <= config.studentRange[1]; i++) {
            availableStudents.push(i);
        }
        
        let studentsHTML = '';
        for (let i = config.studentRange[0]; i <= config.studentRange[1]; i++) {
            // Generate level between 1-3 for demonstration
            const level = Math.floor(Math.random() * 3) + 1;
            const levelDesc = level === 1 ? 'Beginning' : level === 2 ? 'Developing' : 'Proficient';
            
            studentsHTML += `
                <div class="student-card" onclick="loadStudentDetails(${i})">
                    <h3>Student ${i}</h3>
                    <div class="level">Level ${level} - ${levelDesc}</div>
                </div>
            `;
        }
        studentGrid.innerHTML = studentsHTML;
    }, 500);
}

// Load student details with real data
async function loadStudentDetails(studentId) {
    closeStudentModal();
    
    const modal = document.getElementById('detailsModal');
    const detailsContainer = document.getElementById('studentDetails');
    
    // Set current student ID for navigation
    currentStudentId = studentId;
    
    detailsContainer.innerHTML = '<div class="loading">Loading student data...</div>';
    modal.style.display = 'block';
    
    try {
        // Load real student data files
        const basePath = `data/${currentTopic}/student_${studentId}`;
        const config = topicConfigs[currentTopic];
        
        // Load actual JSON files
        const studentData = await loadRealStudentData(basePath);
        displayRealStudentDetails(studentId, config, studentData, basePath);
        
    } catch (error) {
        console.error('Error loading student data:', error);
        detailsContainer.innerHTML = `
            <div style="text-align: center; color: #e53e3e; padding: 40px;">
                <h3>⚠️ Error Loading Student Data</h3>
                <p>Could not load data for Student ${studentId}. Please try again.</p>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">Error: ${error.message}</p>
                <button onclick="closeDetailsModal()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        `;
    }
}

// Load real student data from JSON files
async function loadRealStudentData(basePath) {
    const data = {};
    
    try {
        // Load JSON files
        const jsonFiles = [
            'concept_map.json',
            'evidence_statements.json', 
            'student_performance.json',
            'student_simulation.json'
        ];
        
        for (const file of jsonFiles) {
            try {
                const response = await fetch(`${basePath}/${file}`);
                if (response.ok) {
                    const jsonData = await response.json();
                    data[file.replace('.json', '')] = jsonData;
                }
            } catch (err) {
                console.log(`Could not load ${file}:`, err.message);
            }
        }
        
        // Load student info text file
        try {
            const response = await fetch(`${basePath}/student_info.txt`);
            if (response.ok) {
                const textData = await response.text();
                data.student_info = textData;
            }
        } catch (err) {
            console.log('Could not load student_info.txt:', err.message);
        }
        
        return data;
        
    } catch (error) {
        throw new Error(`Failed to load student data: ${error.message}`);
    }
}

// Display student details
function displayStudentDetails(studentId, config) {
    const detailsContainer = document.getElementById('studentDetails');
    
    // Generate realistic performance level
    const level = Math.floor(Math.random() * 3) + 1;
    const levelDescs = ['Beginning (minimal understanding)', 'Developing (partial understanding)', 'Proficient (full understanding)'];
    
    // Sample data structure based on the files we examined
    const studentData = generateSampleStudentData(studentId, config, level);
    
    detailsContainer.innerHTML = `
        <div class="student-details">
            <div class="detail-header">
                <h2>Student ${studentId}</h2>
                <p>${config.description}</p>
                <div style="margin-top: 15px;">
                    <strong>NGSS Code:</strong> ${config.ngssCode} | 
                    <strong>Grade:</strong> ${config.grade} | 
                    <strong>Level:</strong> ${level} - ${levelDescs[level-1]}
                </div>
            </div>
            
            <div class="detail-tabs">
                <button class="tab-button active" onclick="showTab('overview')">📊 Overview</button>
                <button class="tab-button" onclick="showTab('visual')">🖼️ Visual Work</button>
                <button class="tab-button" onclick="showTab('performance')">📈 Performance</button>
                <button class="tab-button" onclick="showTab('evidence')">📋 Evidence</button>
                <button class="tab-button" onclick="showTab('simulation')">🤖 AI Analysis</button>
            </div>
            
            <div id="tab-overview" class="tab-content active">
                ${generateOverviewTab(studentData)}
            </div>
            
            <div id="tab-visual" class="tab-content">
                ${generateVisualTab(studentId)}
            </div>
            
            <div id="tab-performance" class="tab-content">
                ${generatePerformanceTab(studentData)}
            </div>
            
            <div id="tab-evidence" class="tab-content">
                ${generateEvidenceTab(studentData)}
            </div>
            
            <div id="tab-simulation" class="tab-content">
                ${generateSimulationTab(studentData)}
            </div>
        </div>
    `;
}

// Display real student details with actual data
function displayRealStudentDetails(studentId, config, studentData, basePath) {
    const detailsContainer = document.getElementById('studentDetails');
    
    // Parse student info
    const studentInfo = parseStudentInfo(studentData.student_info || '');
    const performance = studentData.student_performance || {};
    const evidence = studentData.evidence_statements || {};
    const simulation = studentData.student_simulation || {};
    const conceptMap = studentData.concept_map || {};
    
    // Extract level information
    const level = performance.Level || 'Unknown';
    const levelDesc = performance['Level Description'] || 'Not available';
    
    // Get navigation info
    const currentIndex = availableStudents.indexOf(studentId);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < availableStudents.length - 1;
    const previousStudentId = hasPrevious ? availableStudents[currentIndex - 1] : null;
    const nextStudentId = hasNext ? availableStudents[currentIndex + 1] : null;
    
    detailsContainer.innerHTML = `
        <div class="student-details">
            <div class="detail-header">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <button onclick="navigateToStudent(${previousStudentId})" 
                            class="nav-button"
                            ${!hasPrevious ? 'disabled' : ''}
                            title="Previous student (or use left arrow key)">
                        <span style="font-size: 16px;">←</span> Previous
                    </button>
                    
                    <div style="text-align: center;">
                        <h2 style="margin: 0;">Student ${studentId}</h2>
                        <div style="font-size: 0.9em; color: rgba(255,255,255,0.8); margin-top: 5px;">
                            ${currentIndex + 1} of ${availableStudents.length}
                        </div>
                    </div>
                    
                    <button onclick="navigateToStudent(${nextStudentId})" 
                            class="nav-button"
                            ${!hasNext ? 'disabled' : ''}
                            title="Next student (or use right arrow key)">
                        Next <span style="font-size: 16px;">→</span>
                    </button>
                </div>
                
                <p>${studentInfo.Topic || config.description}</p>
                <div style="margin-top: 15px;">
                    <strong>NGSS Code:</strong> ${studentInfo['NGSS Code'] || config.ngss_code} | 
                    <strong>Grade:</strong> ${studentInfo.Grade || config.grade} | 
                    <strong>Level:</strong> ${level} - ${levelDesc}
                </div>
                
                <div style="background: linear-gradient(135deg, #e6f3ff 0%, #bae6fd 100%); 
                            padding: 15px; border-radius: 10px; margin-top: 15px; 
                            border-left: 4px solid #0284c7; font-size: 0.9em;">
                    <strong style="color: #0c4a6e;">💡 Navigation Tip:</strong> 
                    <span style="color: #0c4a6e;">Use the Previous/Next buttons above or your keyboard arrow keys (← →) to navigate between students!</span>
                </div>
            </div>
            
            <div class="detail-tabs">
                <button class="tab-button active" onclick="showTab('overview')">📊 Overview</button>
                <button class="tab-button" onclick="showTab('visual')">🖼️ Visual Work</button>
                <button class="tab-button" onclick="showTab('performance')">📈 Performance</button>
                <button class="tab-button" onclick="showTab('evidence')">📋 Evidence</button>
                <button class="tab-button" onclick="showTab('simulation')">🤖 AI Analysis</button>
            </div>
            
            <div id="tab-overview" class="tab-content active">
                ${generateRealOverviewTab(studentId, studentData, basePath)}
            </div>
            
            <div id="tab-visual" class="tab-content">
                ${generateRealVisualTab(studentId, basePath)}
            </div>
            
            <div id="tab-performance" class="tab-content">
                ${generateRealPerformanceTab(performance)}
            </div>
            
            <div id="tab-evidence" class="tab-content">
                ${generateRealEvidenceTab(evidence)}
            </div>
            
            <div id="tab-simulation" class="tab-content">
                ${generateRealSimulationTab(simulation)}
            </div>
        </div>
    `;
}

// Parse student info from text file
function parseStudentInfo(infoText) {
    const info = {};
    if (!infoText) return info;
    
    const lines = infoText.split('\n');
    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            info[key] = value;
        }
    });
    return info;
}

// Generate sample student data
function generateSampleStudentData(studentId, config, level) {
    const canStatements = {
        1: [
            'Student attempts to draw basic figures with minimal detail',
            'Student shows some understanding of the main concept',
            'Student can identify key elements in simple terms'
        ],
        2: [
            'Student demonstrates partial understanding of the concept',
            'Student includes most required elements in their drawing',
            'Student shows developing scientific vocabulary'
        ],
        3: [
            'Student demonstrates complete understanding of the concept',
            'Student includes all required elements with clear labeling',
            'Student uses appropriate scientific vocabulary and explanations'
        ]
    };
    
    const cannotStatements = {
        1: [
            'Student cannot demonstrate complex scientific relationships',
            'Student lacks detailed labeling and explanations',
            'Student shows minimal understanding of underlying principles'
        ],
        2: [
            'Student sometimes misses minor scientific details',
            'Student may have incomplete explanations',
            'Student shows some confusion with advanced concepts'
        ],
        3: [
            'Student shows mastery with very few limitations',
            'Student may need minimal guidance on advanced applications',
            'Student demonstrates readiness for next level concepts'
        ]
    };
    
    return {
        level: level,
        levelDescription: level === 1 ? 'Beginning' : level === 2 ? 'Developing' : 'Proficient',
        can: canStatements[level],
        cannot: cannotStatements[level],
        evidenceStatements: [
            'Student can identify main elements of the topic',
            'Student demonstrates understanding through visual representation',
            'Student shows appropriate grade-level scientific thinking',
            'Student can communicate scientific ideas through drawing',
            'Student shows engagement with the scientific concept'
        ],
        reasoning: `Student ${studentId} demonstrates ${level === 1 ? 'beginning' : level === 2 ? 'developing' : 'proficient'} understanding of ${config.name.toLowerCase()}. Their work shows ${level === 1 ? 'basic attempts' : level === 2 ? 'growing comprehension' : 'mastery'} of the key concepts.`,
        explanation: `The student's work aligns with Level ${level} expectations, showing ${level === 1 ? 'minimal but emerging' : level === 2 ? 'partial but developing' : 'complete and sophisticated'} understanding of the scientific concepts.`
    };
}

// Generate overview tab
function generateOverviewTab(data) {
    return `
        <div class="visual-content">
            <div class="drawing-container">
                <h3>🎨 Student Drawing</h3>
                <div style="background: #f0f0f0; padding: 40px; border-radius: 10px; color: #666;">
                    <p>📷 Student drawing would appear here</p>
                    <p style="font-size: 0.9em; margin-top: 10px;">Original artwork showing student's interpretation of the concept</p>
                </div>
            </div>
            <div class="concept-map-container">
                <h3>🗺️ Concept Map</h3>
                <div style="background: #f0f0f0; padding: 40px; border-radius: 10px; color: #666;">
                    <p>🌐 Interactive concept map would appear here</p>
                    <p style="font-size: 0.9em; margin-top: 10px;">Visual representation of student's conceptual understanding</p>
                </div>
            </div>
        </div>
        <div style="background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%); padding: 20px; border-radius: 15px; margin-top: 20px;">
            <h3 style="color: #234e52; margin-bottom: 15px;">📊 Quick Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <strong>Performance Level:</strong><br>
                    Level ${data.level} - ${data.levelDescription}
                </div>
                <div>
                    <strong>Key Strengths:</strong><br>
                    ${data.can[0]}
                </div>
                <div>
                    <strong>Growth Areas:</strong><br>
                    ${data.cannot[0]}
                </div>
            </div>
        </div>
    `;
}

// Generate visual tab
function generateRealVisualTab(topicId, studentId) {
    return `
        <div class="visual-content">
            <div class="drawing-container">
                <h3>Student Drawing</h3>
                <img src="/api/image/${topicId}/${studentId}/drawing"
                     alt="Student ${studentId} drawing"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            </div>
            <div class="concept-map-container">
                <h3>Concept Map</h3>
                <object data="/api/image/${topicId}/${studentId}/concept_map"
                        type="image/svg+xml"
                        style="width: 100%; height: 400px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <p>Concept map not available</p>
                </object>
            </div>
        </div>
    `;
}

// Generate performance tab
function generatePerformanceTab(data) {
    return `
        <div class="performance-section">
            <div class="can-do">
                <h3>✅ Student CAN Do</h3>
                <ul class="performance-list">
                    ${data.can.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="cannot-do">
                <h3>❌ Student CANNOT Yet Do</h3>
                <ul class="performance-list">
                    ${data.cannot.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div style="background: linear-gradient(135deg, #fffaf0 0%, #fef2e0 100%); padding: 20px; border-radius: 15px; margin-top: 20px; border-left: 4px solid #ed8936;">
            <h4 style="color: #7b341e; margin-bottom: 10px;">💡 Teaching Recommendations</h4>
            <p style="color: #7b341e; margin-bottom: 15px;">
                Based on this student's Level ${data.level} performance, consider these instructional strategies:
            </p>
            <ul style="color: #7b341e; padding-left: 20px;">
                ${data.level === 1 ? `
                    <li>Provide more scaffolding and guided practice</li>
                    <li>Use concrete examples and hands-on activities</li>
                    <li>Break down complex concepts into smaller steps</li>
                    <li>Offer additional visual supports and demonstrations</li>
                ` : data.level === 2 ? `
                    <li>Encourage more detailed explanations and labeling</li>
                    <li>Provide opportunities to connect concepts</li>
                    <li>Challenge with slightly more complex applications</li>
                    <li>Support vocabulary development in the subject area</li>
                ` : `
                    <li>Offer extension activities and deeper investigations</li>
                    <li>Encourage peer teaching and collaboration</li>
                    <li>Provide opportunities to apply knowledge in new contexts</li>
                    <li>Challenge with cross-curricular connections</li>
                `}
            </ul>
        </div>
    `;
}

// Generate evidence tab
function generateEvidenceTab(data) {
    return `
        <h3 style="margin-bottom: 20px; color: #4a5568;">📋 Evidence Statements</h3>
        <p style="color: #718096; margin-bottom: 25px;">
            These statements describe what students should be able to demonstrate for this NGSS standard.
        </p>
        <ul class="evidence-list">
            ${data.evidenceStatements.map(statement => `<li>${statement}</li>`).join('')}
        </ul>
        <div style="background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 20px; border-radius: 15px; margin-top: 25px; border-left: 4px solid #38a169;">
            <h4 style="color: #22543d; margin-bottom: 10px;">🎯 Assessment Alignment</h4>
            <p style="color: #22543d;">
                This student's work demonstrates alignment with <strong>${data.evidenceStatements.length}</strong> evidence statements.
                The performance indicates <strong>${data.levelDescription.toLowerCase()}</strong> understanding of the target concepts.
            </p>
        </div>
    `;
}

// Generate simulation tab
function generateSimulationTab(data) {
    return `
        <div class="simulation-content">
            <h4>🤖 AI Reasoning Process</h4>
            <p>${data.reasoning}</p>
        </div>
        <div class="simulation-content" style="margin-top: 20px;">
            <h4>📝 Image Generation Prompt</h4>
            <p>Based on the student's performance level, an AI system would generate a prompt describing how this student would approach the drawing task, considering their capabilities and limitations.</p>
        </div>
        <div class="simulation-content" style="margin-top: 20px;">
            <h4>💭 Educational Analysis</h4>
            <p>${data.explanation}</p>
        </div>
        <div style="background: linear-gradient(135deg, #e6f3ff 0%, #bae6fd 100%); padding: 20px; border-radius: 15px; margin-top: 20px; border-left: 4px solid #0284c7;">
            <h4 style="color: #0c4a6e; margin-bottom: 10px;">🔬 Research Applications</h4>
            <p style="color: #0c4a6e;">
                This AI analysis helps researchers understand how students at different performance levels 
                approach scientific drawing tasks, providing insights for curriculum development and 
                instructional design.
            </p>
        </div>
    `;
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Navigation function for Previous/Next buttons
async function navigateToStudent(studentId) {
    if (!studentId || !availableStudents.includes(studentId)) {
        return;
    }
    
    const detailsContainer = document.getElementById('studentDetails');
    detailsContainer.innerHTML = '<div class="loading">Loading student data...</div>';
    
    // Update current student ID
    currentStudentId = studentId;
    
    try {
        // Load real student data files
        const basePath = `data/${currentTopic}/student_${studentId}`;
        const config = topicConfigs[currentTopic];
        
        // Load actual JSON files
        const studentData = await loadRealStudentData(basePath);
        displayRealStudentDetails(studentId, config, studentData, basePath);
        
    } catch (error) {
        console.error('Error loading student data:', error);
        detailsContainer.innerHTML = `
            <div style="text-align: center; color: #e53e3e; padding: 40px;">
                <h3>⚠️ Error Loading Student Data</h3>
                <p>Could not load data for Student ${studentId}. Please try again.</p>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">Error: ${error.message}</p>
                <button onclick="closeDetailsModal()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        `;
    }
}

// Modal control functions
function closeStudentModal() {
    document.getElementById('studentModal').style.display = 'none';
}

function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none';
    currentStudentId = null;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const studentModal = document.getElementById('studentModal');
    const detailsModal = document.getElementById('detailsModal');
    
    if (event.target === studentModal) {
        closeStudentModal();
    }
    if (event.target === detailsModal) {
        closeDetailsModal();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showWelcomeMessage();
});

// Real data tab generation functions

// Generate real overview tab with actual data
function generateRealOverviewTab(studentId, studentData, basePath) {
    const performance = studentData.student_performance || {};
    const level = performance.Level || 'Unknown';
    const levelDesc = performance['Level Description'] || 'Not available';
    
    return `
        <div class="visual-content">
            <div class="drawing-container">
                <h3>🎨 Student Drawing</h3>
                <img src="${basePath}/drawing.png" 
                     alt="Student ${studentId} drawing" 
                     style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                <div style="display: none; background: #f0f0f0; padding: 40px; border-radius: 10px; color: #666; text-align: center;">
                    <p>📷 Image not available</p>
                    <p style="font-size: 0.9em;">drawing.png could not be loaded</p>
                </div>
            </div>
            <div class="concept-map-container">
                <h3>🗺️ Concept Map</h3>
                <object data="${basePath}/concept_map.svg" 
                        type="image/svg+xml" 
                        style="width: 100%; height: 300px; border: 1px solid #e2e8f0; border-radius: 10px;">
                    <div style="background: #f0f0f0; padding: 40px; border-radius: 10px; color: #666; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <div>
                            <p>🌐 Concept map not available</p>
                            <p style="font-size: 0.9em;">concept_map.svg could not be loaded</p>
                        </div>
                    </div>
                </object>
            </div>
        </div>
        <div style="background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%); padding: 20px; border-radius: 15px; margin-top: 20px;">
            <h3 style="color: #234e52; margin-bottom: 15px;">📊 Quick Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <strong>Performance Level:</strong><br>
                    Level ${level} - ${levelDesc}
                </div>
                <div>
                    <strong>Data Source:</strong><br>
                    Real student files loaded
                </div>
                <div>
                    <strong>Files Available:</strong><br>
                    Drawing, Concept Map, Performance Data
                </div>
            </div>
        </div>
    `;
}

// Generate real visual tab with actual images
function generateRealVisualTab(studentId, basePath) {
    return `
        <div class="visual-content">
            <div class="drawing-container">
                <h3>🎨 Original Student Drawing</h3>
                <img src="${basePath}/drawing.png" 
                     alt="Student ${studentId} drawing" 
                     style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); cursor: pointer;"
                     onclick="window.open('${basePath}/drawing.png', '_blank')"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                <div style="display: none; background: #f8f9fa; border: 2px dashed #dee2e6; padding: 60px 20px; border-radius: 10px; text-align: center; color: #6c757d;">
                    <div style="font-size: 3em; margin-bottom: 15px;">📷</div>
                    <h4>Drawing Not Available</h4>
                    <p>drawing.png could not be loaded</p>
                    <p style="font-size: 0.9em; margin-top: 10px;">
                        Expected location: <code>${basePath}/drawing.png</code>
                    </p>
                </div>
            </div>
            <div class="concept-map-container">
                <h3>🗺️ Interactive Concept Map</h3>
                <object data="${basePath}/concept_map.svg" 
                        type="image/svg+xml" 
                        style="width: 100%; height: 500px; border: 1px solid #e2e8f0; border-radius: 10px; background: white;">
                    <div style="background: #f8f9fa; border: 2px dashed #dee2e6; padding: 60px 20px; border-radius: 10px; text-align: center; color: #6c757d; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <div>
                            <div style="font-size: 3em; margin-bottom: 15px;">🌐</div>
                            <h4>Concept Map Not Available</h4>
                            <p>concept_map.svg could not be loaded</p>
                            <p style="font-size: 0.9em; margin-top: 10px;">
                                Expected location: <code>${basePath}/concept_map.svg</code>
                            </p>
                        </div>
                    </div>
                </object>
            </div>
        </div>
        <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%); padding: 20px; border-radius: 15px; margin-top: 20px; border-left: 4px solid #0284c7;">
            <h4 style="color: #0c4a6e; margin-bottom: 10px;">🔍 Viewing Tips</h4>
            <ul style="color: #0c4a6e; padding-left: 20px;">
                <li>Click the drawing to view it in full size</li>
                <li>The concept map is interactive - you can zoom and explore</li>
                <li>Both files are loaded directly from the student data directory</li>
                <li>If images don't load, check that the files exist in the data folder</li>
            </ul>
        </div>
    `;
}

// Generate real performance tab with actual data
function generateRealPerformanceTab(performance) {
    const canDo = performance.CAN || [];
    const cannotDo = performance.CANNOT || [];
    const level = performance.Level || 'Unknown';
    const levelDesc = performance['Level Description'] || 'Not available';
    
    return `
        <div class="performance-section">
            <div class="can-do">
                <h3>✅ Student CAN Do</h3>
                <ul class="performance-list">
                    ${canDo.length > 0 ? canDo.map(item => `<li>${item}</li>`).join('') : '<li>No capabilities listed</li>'}
                </ul>
            </div>
            <div class="cannot-do">
                <h3>❌ Student CANNOT Yet Do</h3>
                <ul class="performance-list">
                    ${cannotDo.length > 0 ? cannotDo.map(item => `<li>${item}</li>`).join('') : '<li>No limitations listed</li>'}
                </ul>
            </div>
        </div>
        <div style="background: linear-gradient(135deg, #fffaf0 0%, #fef2e0 100%); padding: 20px; border-radius: 15px; margin-top: 20px; border-left: 4px solid #ed8936;">
            <h4 style="color: #7b341e; margin-bottom: 10px;">📈 Performance Level: ${level}</h4>
            <p style="color: #7b341e; margin-bottom: 15px;">
                <strong>Description:</strong> ${levelDesc}
            </p>
            <p style="color: #7b341e;">
                This assessment is based on the actual student performance data loaded from the JSON files.
            </p>
        </div>
    `;
}

// Generate real evidence tab with actual data
function generateRealEvidenceTab(evidence) {
    const statements = evidence['Evidence Statements'] || [];
    const topic = evidence.Topic || 'Topic not specified';
    const code = evidence.Code || 'Code not specified';
    
    return `
        <h3 style="margin-bottom: 20px; color: #4a5568;">📋 Evidence Statements</h3>
        <p style="color: #718096; margin-bottom: 25px;">
            <strong>Topic:</strong> ${topic}<br>
            <strong>NGSS Code:</strong> ${code}
        </p>
        <ul class="evidence-list">
            ${statements.length > 0 ? statements.map(statement => `<li>${statement}</li>`).join('') : '<li>No evidence statements available</li>'}
        </ul>
        <div style="background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 20px; border-radius: 15px; margin-top: 25px; border-left: 4px solid #38a169;">
            <h4 style="color: #22543d; margin-bottom: 10px;">🎯 Assessment Information</h4>
            <p style="color: #22543d;">
                These evidence statements are loaded directly from the student's evidence_statements.json file.
                They represent the specific learning objectives and assessment criteria for this NGSS standard.
            </p>
        </div>
    `;
}

// Generate real simulation tab with actual data
function generateRealSimulationTab(simulation) {
    const reasoning = simulation.Reasoning || 'No reasoning provided';
    const prompt = simulation.Prompt || 'No prompt provided';
    const explanation = simulation.Explaination || simulation.Explanation || 'No explanation provided';
    
    return `
        <div class="simulation-content">
            <h4>🤖 AI Reasoning Process</h4>
            <p>${reasoning}</p>
        </div>
        <div class="simulation-content" style="margin-top: 20px;">
            <h4>📝 Image Generation Prompt</h4>
            <p>${prompt}</p>
        </div>
        <div class="simulation-content" style="margin-top: 20px;">
            <h4>💭 Educational Analysis</h4>
            <p>${explanation}</p>
        </div>
        <div style="background: linear-gradient(135deg, #e6f3ff 0%, #bae6fd 100%); padding: 20px; border-radius: 15px; margin-top: 20px; border-left: 4px solid #0284c7;">
            <h4 style="color: #0c4a6e; margin-bottom: 10px;">🔬 Simulation Data Source</h4>
            <p style="color: #0c4a6e;">
                This analysis is loaded directly from the student's student_simulation.json file, which contains
                AI-generated reasoning about how a student at this performance level would approach the drawing task.
            </p>
        </div>
    `;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeStudentModal();
        closeDetailsModal();
        return;
    }
    
    // Arrow key navigation when student details modal is open
    if (currentStudentId && document.getElementById('detailsModal').style.display === 'block') {
        const currentIndex = availableStudents.indexOf(currentStudentId);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            // Previous student
            const previousStudentId = availableStudents[currentIndex - 1];
            navigateToStudent(previousStudentId);
            event.preventDefault();
        } else if (event.key === 'ArrowRight' && currentIndex < availableStudents.length - 1) {
            // Next student
            const nextStudentId = availableStudents[currentIndex + 1];
            navigateToStudent(nextStudentId);
            event.preventDefault();
        }
    }
}); 