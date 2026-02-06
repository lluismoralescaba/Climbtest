// ClimbTest App - Main JavaScript

// Estado de la aplicación
let currentResults = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderQuestions();
    setupEventListeners();
    loadHistory();
}

// Renderizar preguntas en el formulario
function renderQuestions() {
    const container = document.querySelector('.questions-container');
    
    QUESTIONS.forEach(question => {
        const questionCard = createQuestionCard(question);
        container.appendChild(questionCard);
    });
}

function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card';
    
    const categoryClass = `category-${question.category}`;
    const categoryName = CATEGORY_NAMES[question.category];
    
    card.innerHTML = `
        <div class="question-header">
            <div class="question-number">${question.id}</div>
            <div>
                <div class="question-text">${question.text}</div>
                <span class="category-badge ${categoryClass}">${categoryName}</span>
            </div>
        </div>
        <div class="rating-scale">
            ${createRatingOptions(question.id)}
        </div>
    `;
    
    return card;
}

function createRatingOptions(questionId) {
    let html = '';
    for (let i = 0; i <= 5; i++) {
        html += `
            <div class="rating-option">
                <input type="radio" 
                       id="q${questionId}_${i}" 
                       name="q${questionId}" 
                       value="${i}" 
                       required>
                <label for="q${questionId}_${i}" class="rating-label">${i}</label>
                <span class="rating-text">${RATING_LABELS[i]}</span>
            </div>
        `;
    }
    return html;
}

// Event Listeners
function setupEventListeners() {
    // Navegación entre tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Submit del formulario
    document.getElementById('testForm').addEventListener('submit', handleFormSubmit);
    
    // Resetear formulario
    document.getElementById('resetBtn').addEventListener('click', resetForm);
    
    // Exportar datos
    document.getElementById('exportBtn').addEventListener('click', exportData);
    
    // Limpiar histórico
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
}

function switchTab(tabName) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
    
    // Si cambiamos a histórico, recargarlo
    if (tabName === 'history') {
        loadHistory();
    }
}

// Manejar envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const answers = {};
    
    // Recoger respuestas
    QUESTIONS.forEach(q => {
        const value = formData.get(`q${q.id}`);
        answers[q.id] = parseInt(value);
    });
    
    // Calcular resultados
    const results = calculateResults(answers);
    
    // Guardar en localStorage
    saveResults(results);
    
    // Mostrar resultados
    currentResults = results;
    displayResults(results);
    
    // Cambiar a tab de resultados
    switchTab('results');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calcular resultados por categoría
function calculateResults(answers) {
    const results = {
        date: new Date().toISOString(),
        dateFormatted: formatDate(new Date()),
        mental: 0,
        tecnica: 0,
        fisico: 0,
        total: 0,
        answers: answers
    };
    
    QUESTIONS.forEach(q => {
        const score = answers[q.id];
        results[q.category] += score;
        results.total += score;
    });
    
    return results;
}

// Guardar resultados en localStorage
function saveResults(results) {
    let history = JSON.parse(localStorage.getItem('climbTestHistory') || '[]');
    history.push(results);
    localStorage.setItem('climbTestHistory', JSON.stringify(history));
}

// Mostrar resultados
function displayResults(results) {
    const container = document.getElementById('currentResults');
    
    container.innerHTML = `
        <div class="results-container">
            <div class="result-summary">
                <div class="result-date">📅 ${results.dateFormatted}</div>
                
                <div class="scores-grid">
                    <div class="score-card mental">
                        <div class="score-title">🧠 Mental</div>
                        <div class="score-value">${results.mental}<span class="score-max">/50</span></div>
                    </div>
                    <div class="score-card tecnica">
                        <div class="score-title">🎯 Técnica y Táctica</div>
                        <div class="score-value">${results.tecnica}<span class="score-max">/50</span></div>
                    </div>
                    <div class="score-card fisico">
                        <div class="score-title">💪 Físico</div>
                        <div class="score-value">${results.fisico}<span class="score-max">/50</span></div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Distribución de Puntuaciones</h3>
                    <div class="chart-wrapper">
                        <canvas id="currentChart"></canvas>
                    </div>
                </div>
                
                ${generateInterpretation(results)}
            </div>
        </div>
    `;
    
    // Renderizar gráfico
    renderCurrentChart(results);
}

// Generar interpretación de resultados
function generateInterpretation(results) {
    const categories = [
        { name: 'Mental', value: results.mental, key: 'mental' },
        { name: 'Técnica y Táctica', value: results.tecnica, key: 'tecnica' },
        { name: 'Físico', value: results.fisico, key: 'fisico' }
    ];
    
    // Ordenar de menor a mayor (menor puntuación = más problemas)
    categories.sort((a, b) => a.value - b.value);
    
    const weakest = categories[0];
    const strongest = categories[2];
    
    let html = '<div class="interpretation"><h3>💡 Interpretación</h3>';
    
    // Área de mejora (menor puntuación = más problemas)
    html += `
        <div class="interpretation-item improvement">
            <h4>🎯 Área prioritaria de mejora: ${weakest.name}</h4>
            <p>Con ${weakest.value} puntos, esta es el área que presenta más dificultades. 
            Valores bajos indican problemas frecuentes. Enfoca tu entrenamiento en mejorar 
            aspectos relacionados con ${weakest.name.toLowerCase()}.</p>
        </div>
    `;
    
    // Área fuerte
    html += `
        <div class="interpretation-item strength">
            <h4>✅ Fortaleza: ${strongest.name}</h4>
            <p>Con ${strongest.value} puntos, este es tu área más desarrollada. 
            Mantén el trabajo en esta área y úsala como base para mejorar las demás.</p>
        </div>
    `;
    
    // Recomendaciones específicas
    html += '<div class="interpretation-item">';
    html += '<h4>📋 Recomendaciones:</h4><ul style="margin-left: 1.5rem; margin-top: 0.5rem;">';
    
    if (weakest.key === 'mental') {
        html += '<li>Trabaja técnicas de visualización antes de escalar</li>';
        html += '<li>Practica la gestión de la ansiedad en pasos clave</li>';
        html += '<li>Incrementa gradualmente la exposición a situaciones que te generan estrés</li>';
    } else if (weakest.key === 'tecnica') {
        html += '<li>Dedica sesiones específicas a trabajo técnico de pies</li>';
        html += '<li>Practica lectura de vías y planificación de secuencias</li>';
        html += '<li>Trabaja eficiencia de movimiento en rutas fáciles</li>';
    } else {
        html += '<li>Optimiza tu plan de entrenamiento físico</li>';
        html += '<li>Revisa tu programa de descanso y recuperación</li>';
        html += '<li>Considera trabajo específico de fuerza y resistencia</li>';
    }
    
    html += '</ul></div></div>';
    
    return html;
}

// Renderizar gráfico actual
function renderCurrentChart(results) {
    const ctx = document.getElementById('currentChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mental', 'Técnica y Táctica', 'Físico'],
            datasets: [{
                label: 'Puntuación',
                data: [results.mental, results.tecnica, results.fisico],
                backgroundColor: [
                    'rgba(214, 137, 16, 0.6)',
                    'rgba(40, 116, 166, 0.6)',
                    'rgba(202, 111, 30, 0.6)'
                ],
                borderColor: [
                    'rgba(214, 137, 16, 1)',
                    'rgba(40, 116, 166, 1)',
                    'rgba(202, 111, 30, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        stepSize: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} / 50 puntos`;
                        }
                    }
                }
            }
        }
    });
}

// Cargar histórico
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('climbTestHistory') || '[]');
    const container = document.getElementById('historyContainer');
    
    if (history.length === 0) {
        container.innerHTML = '<p class="no-data">No hay datos históricos disponibles</p>';
        return;
    }
    
    // Ordenar por fecha descendente
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let html = '<div class="history-list">';
    
    history.forEach((result, index) => {
        html += `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-date">${result.dateFormatted}</div>
                    <button class="delete-btn" onclick="deleteHistoryItem(${index})">🗑️ Eliminar</button>
                </div>
                <div class="history-scores">
                    <div class="history-score category-mental">🧠 Mental: ${result.mental}/50</div>
                    <div class="history-score category-tecnica">🎯 Técnica: ${result.tecnica}/50</div>
                    <div class="history-score category-fisico">💪 Físico: ${result.fisico}/50</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Agregar gráfico de evolución si hay múltiples registros
    if (history.length > 1) {
        html += `
            <div class="chart-container" style="margin-top: 2rem;">
                <h3>📈 Evolución Temporal</h3>
                <div class="chart-wrapper">
                    <canvas id="historyChart"></canvas>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Renderizar gráfico de evolución
    if (history.length > 1) {
        renderHistoryChart(history);
    }
}

// Renderizar gráfico de evolución
function renderHistoryChart(history) {
    const ctx = document.getElementById('historyChart');
    if (!ctx) return;
    
    // Invertir para mostrar cronológicamente
    const chronological = [...history].reverse();
    
    const labels = chronological.map(r => r.dateFormatted.split(' ')[0]); // Solo fecha
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mental',
                    data: chronological.map(r => r.mental),
                    borderColor: 'rgba(214, 137, 16, 1)',
                    backgroundColor: 'rgba(214, 137, 16, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Técnica y Táctica',
                    data: chronological.map(r => r.tecnica),
                    borderColor: 'rgba(40, 116, 166, 1)',
                    backgroundColor: 'rgba(40, 116, 166, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Físico',
                    data: chronological.map(r => r.fisico),
                    borderColor: 'rgba(202, 111, 30, 1)',
                    backgroundColor: 'rgba(202, 111, 30, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        stepSize: 10
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}/50`;
                        }
                    }
                }
            }
        }
    });
}

// Eliminar un elemento del histórico
function deleteHistoryItem(index) {
    if (!confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        return;
    }
    
    let history = JSON.parse(localStorage.getItem('climbTestHistory') || '[]');
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
    history.splice(index, 1);
    localStorage.setItem('climbTestHistory', JSON.stringify(history));
    loadHistory();
}

// Limpiar todo el histórico
function clearHistory() {
    if (!confirm('¿Estás seguro de que quieres eliminar TODO el histórico? Esta acción no se puede deshacer.')) {
        return;
    }
    
    localStorage.removeItem('climbTestHistory');
    loadHistory();
    alert('Histórico eliminado correctamente');
}

// Exportar datos a JSON
function exportData() {
    const history = JSON.parse(localStorage.getItem('climbTestHistory') || '[]');
    
    if (history.length === 0) {
        alert('No hay datos para exportar');
        return;
    }
    
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `climbtest_export_${formatDateForFilename(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Resetear formulario
function resetForm() {
    if (!confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
        return;
    }
    
    document.getElementById('testForm').reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Utilidades de formato de fecha
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
}

function formatDateForFilename(date) {
    return date.toISOString().split('T')[0];
}
