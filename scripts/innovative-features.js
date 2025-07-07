// Innovative Features for Explora RD
// Advanced 3D interactions, AI assistant, and modern UX enhancements

class TourismInnovations {
    constructor() {
        this.visitorsCount = 0;
        this.currentCurrency = 'USD';
        this.weatherData = null;
        this.travelBadges = JSON.parse(localStorage.getItem('travelBadges') || '[]');
        this.init();
    }

    init() {
        this.initParticleBackground();
        this.init3DCards();
        this.initAIAssistant();
        this.initCurrencyConverter();
        this.initWeatherWidget();
        this.initGamification();
        this.initVisitorCounter();
        this.initAdvancedAnimations();
        this.initVoiceAssistant();
    }

    // Particle Background System
    initParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 3D Interactive Cards
    init3DCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.3s ease-out';
            
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'rotateY(10deg) rotateX(5deg) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                card.style.boxShadow = '';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
        });
    }

    // AI Virtual Assistant
    initAIAssistant() {
        const assistantHTML = `
            <div id="ai-assistant" class="position-fixed" style="bottom: 20px; right: 20px; z-index: 1050;">
                <div id="assistant-chat" class="card shadow-lg" style="width: 350px; height: 450px; display: none;">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h6 class="mb-0"><i class="bi bi-robot me-2"></i>Asistente Virtual RD</h6>
                        <button class="btn btn-sm btn-outline-light" onclick="tourismInnovations.toggleAssistant()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="card-body" id="chat-messages" style="height: 300px; overflow-y: auto;">
                        <div class="assistant-message">
                            <strong>🤖 Asistente:</strong> ¡Hola! Soy tu guía virtual de República Dominicana. ¿En qué puedo ayudarte hoy?
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <input type="text" id="user-input" class="form-control" placeholder="Escribe tu pregunta...">
                            <button class="btn btn-primary" onclick="tourismInnovations.sendMessage()">
                                <i class="bi bi-send"></i>
                            </button>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary mt-2 w-100" onclick="tourismInnovations.startVoiceInput()">
                            <i class="bi bi-mic"></i> Hablar
                        </button>
                    </div>
                </div>
                <button id="assistant-toggle" class="btn btn-primary rounded-circle shadow-lg" style="width: 60px; height: 60px;">
                    <i class="bi bi-robot" style="font-size: 1.5rem;"></i>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', assistantHTML);
        
        document.getElementById('assistant-toggle').addEventListener('click', () => {
            this.toggleAssistant();
        });
        
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleAssistant() {
        const chat = document.getElementById('assistant-chat');
        const toggle = document.getElementById('assistant-toggle');
        
        if (chat.style.display === 'none') {
            chat.style.display = 'block';
            toggle.style.display = 'none';
        } else {
            chat.style.display = 'none';
            toggle.style.display = 'block';
        }
    }

    sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        const messagesContainer = document.getElementById('chat-messages');
        
        // Add user message
        messagesContainer.innerHTML += `
            <div class="user-message text-end mb-2">
                <strong>👤 Tú:</strong> ${message}
            </div>
        `;
        
        // AI Response
        const response = this.getAIResponse(message);
        messagesContainer.innerHTML += `
            <div class="assistant-message mb-2">
                <strong>🤖 Asistente:</strong> ${response}
            </div>
        `;
        
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getAIResponse(message) {
        const responses = {
            'clima': 'El clima en República Dominicana es tropical todo el año, con temperaturas entre 25-30°C. Te recomiendo visitar entre diciembre y abril para menos lluvia.',
            'playas': 'Las mejores playas incluyen Punta Cana, Playa Dorada, Bahía de las Águilas y Cayo Levantado. ¿Te interesa alguna en particular?',
            'hoteles': 'Tenemos opciones desde hoteles boutique hasta resorts todo incluido. ¿Cuál es tu presupuesto aproximado?',
            'actividades': 'Puedes hacer snorkel, buceo, avistamiento de ballenas, tours culturales, senderismo y mucho más. ¿Qué tipo de aventura prefieres?',
            'transporte': 'Ofrecemos traslados desde el aeropuerto, alquiler de autos y tours con transporte incluido. ¿Necesitas ayuda con alguno?',
            'restaurantes': 'La gastronomía dominicana es deliciosa. Te recomiendo probar mangú, sancocho, pescao y platanos maduros.',
            'presupuesto': 'República Dominicana ofrece opciones para todos los presupuestos. Un viaje promedio cuesta entre $800-2000 por persona por semana.',
            'documentos': 'Los ciudadanos de la mayoría de países solo necesitan pasaporte válido. Para estancias mayores a 30 días, necesitarás visa.'
        };
        
        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return 'Interesante pregunta. Te sugiero contactar a nuestro equipo para información más específica. ¿Te gustaría que te ayude con información sobre destinos, actividades o planificación?';
    }

    // Voice Assistant
    initVoiceAssistant() {
        if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
            this.recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
            this.recognition.lang = 'es-ES';
            this.recognition.continuous = false;
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('user-input').value = transcript;
                this.sendMessage();
            };
        }
    }

    startVoiceInput() {
        if (this.recognition) {
            this.recognition.start();
        } else {
            alert('Tu navegador no soporta reconocimiento de voz');
        }
    }

    // Currency Converter Widget
    initCurrencyConverter() {
        const converterHTML = `
            <div class="card mt-4" id="currency-converter">
                <div class="card-header">
                    <h6 class="mb-0"><i class="bi bi-currency-exchange me-2"></i>Conversor de Moneda</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <label class="form-label">Cantidad</label>
                            <input type="number" class="form-control" id="amount" value="100">
                        </div>
                        <div class="col-6">
                            <label class="form-label">Moneda</label>
                            <select class="form-select" id="currency-select">
                                <option value="USD">USD - Dólar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="CAD">CAD - Dólar Canadiense</option>
                                <option value="GBP">GBP - Libra</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="alert alert-info">
                            <strong id="conversion-result">100 USD = 5,800 DOP</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to contact section
        const contactSection = document.querySelector('#contactanos .container');
        if (contactSection) {
            contactSection.insertAdjacentHTML('beforeend', converterHTML);
            
            document.getElementById('amount').addEventListener('input', this.updateCurrency.bind(this));
            document.getElementById('currency-select').addEventListener('change', this.updateCurrency.bind(this));
        }
    }

    updateCurrency() {
        const amount = document.getElementById('amount').value;
        const currency = document.getElementById('currency-select').value;
        
        // Simulated exchange rates (in real app, use actual API)
        const rates = {
            'USD': 58,
            'EUR': 63,
            'CAD': 43,
            'GBP': 73
        };
        
        const result = amount * rates[currency];
        document.getElementById('conversion-result').textContent = 
            `${amount} ${currency} = ${result.toLocaleString()} DOP`;
    }

    // Weather Widget
    initWeatherWidget() {
        const weatherHTML = `
            <div class="card mt-4" id="weather-widget">
                <div class="card-header">
                    <h6 class="mb-0"><i class="bi bi-cloud-sun me-2"></i>Clima Actual en RD</h6>
                </div>
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-4">
                            <div class="weather-item">
                                <i class="bi bi-sun text-warning" style="font-size: 2rem;"></i>
                                <div>Santo Domingo</div>
                                <div><strong>28°C</strong></div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="weather-item">
                                <i class="bi bi-cloud-sun text-info" style="font-size: 2rem;"></i>
                                <div>Punta Cana</div>
                                <div><strong>30°C</strong></div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="weather-item">
                                <i class="bi bi-clouds text-secondary" style="font-size: 2rem;"></i>
                                <div>Samaná</div>
                                <div><strong>26°C</strong></div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <small class="text-muted">Última actualización: ${new Date().toLocaleTimeString()}</small>
                    </div>
                </div>
            </div>
        `;
        
        const contactSection = document.querySelector('#contactanos .container');
        if (contactSection) {
            contactSection.insertAdjacentHTML('beforeend', weatherHTML);
        }
    }

    // Gamification System
    initGamification() {
        const badgesHTML = `
            <div class="card mt-4" id="travel-badges">
                <div class="card-header">
                    <h6 class="mb-0"><i class="bi bi-award me-2"></i>Insignias de Viajero</h6>
                </div>
                <div class="card-body">
                    <div class="row" id="badges-container">
                        <!-- Badges will be added here -->
                    </div>
                    <button class="btn btn-sm btn-outline-primary mt-2" onclick="tourismInnovations.earnBadge('explorer')">
                        Ganar Insignia de Explorador
                    </button>
                </div>
            </div>
        `;
        
        const contactSection = document.querySelector('#contactanos .container');
        if (contactSection) {
            contactSection.insertAdjacentHTML('beforeend', badgesHTML);
            this.displayBadges();
        }
    }

    earnBadge(badgeType) {
        const badges = {
            'explorer': { name: 'Explorador', icon: 'compass', description: 'Has explorado la página' },
            'planner': { name: 'Planificador', icon: 'calendar', description: 'Has usado las herramientas de planificación' },
            'social': { name: 'Social', icon: 'share', description: 'Has compartido contenido' }
        };
        
        if (!this.travelBadges.includes(badgeType)) {
            this.travelBadges.push(badgeType);
            localStorage.setItem('travelBadges', JSON.stringify(this.travelBadges));
            
            // Show achievement notification
            this.showNotification(`¡Felicidades! Has ganado la insignia: ${badges[badgeType].name}`);
            this.displayBadges();
        }
    }

    displayBadges() {
        const container = document.getElementById('badges-container');
        if (!container) return;
        
        const badgeDefinitions = {
            'explorer': { name: 'Explorador', icon: 'compass', color: 'success' },
            'planner': { name: 'Planificador', icon: 'calendar', color: 'info' },
            'social': { name: 'Social', icon: 'share', color: 'warning' }
        };
        
        container.innerHTML = '';
        this.travelBadges.forEach(badgeType => {
            const badge = badgeDefinitions[badgeType];
            container.innerHTML += `
                <div class="col-4 text-center">
                    <div class="badge-item">
                        <i class="bi bi-${badge.icon} text-${badge.color}" style="font-size: 2rem;"></i>
                        <div><small>${badge.name}</small></div>
                    </div>
                </div>
            `;
        });
    }

    // Visitor Counter
    initVisitorCounter() {
        this.visitorsCount = Math.floor(Math.random() * 1000) + 500; // Simulated
        
        const counterHTML = `
            <div class="text-center mt-4 p-3 bg-primary text-white rounded">
                <h6><i class="bi bi-people me-2"></i>Visitantes Hoy</h6>
                <h3 id="visitor-count">${this.visitorsCount.toLocaleString()}</h3>
                <small>personas están explorando RD</small>
            </div>
        `;
        
        const heroSection = document.querySelector('.hero-content');
        if (heroSection) {
            heroSection.insertAdjacentHTML('afterend', counterHTML);
            
            // Animate counter
            setInterval(() => {
                this.visitorsCount += Math.floor(Math.random() * 3);
                document.getElementById('visitor-count').textContent = this.visitorsCount.toLocaleString();
            }, 10000);
        }
    }

    // Advanced Animations
    initAdvancedAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        document.querySelectorAll('.card, .service-icon').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });

        // Add floating animation to hero elements
        const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p');
        heroElements.forEach((el, index) => {
            el.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
        `;
        notification.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tourismInnovations = new TourismInnovations();
});