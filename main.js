// ===== FUNCIONES PRINCIPALES =====

//Barra de progreso del index
document.addEventListener('DOMContentLoaded', function() {
    const progreso = 65; // Valor real del progreso (ej: 65%)
    const barra = document.getElementById('progress-simulacion');
    barra.style.width = `${progreso}%`;
    barra.setAttribute('aria-valuenow', progreso);
    barra.textContent = `${progreso}% Completado`;
  });

// Modo claro/oscuro
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar si hay preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o preferencia del sistema
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }
    
    // Configurar el interruptor de tema
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            body.classList.toggle('dark-mode');
            
            // Guardar preferencia
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Validación de formularios
function setupFormValidation() {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Resetear errores
            resetErrors([name, email, message]);
            
            // Validar nombre
            if (!name.value.trim()) {
                showError(name, 'Por favor ingresa tu nombre');
                isValid = false;
            }
            
            // Validar email
            if (!email.value.trim()) {
                showError(email, 'Por favor ingresa tu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un email válido');
                isValid = false;
            }
            
            // Validar mensaje
            if (!message.value.trim()) {
                showError(message, 'Por favor escribe tu mensaje');
                isValid = false;
            }
            
            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            }
        });
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            let isValid = true;
            
            // Resetear errores
            resetErrors([email, password]);
            
            // Validar email
            if (!email.value.trim()) {
                showError(email, 'Por favor ingresa tu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un email válido');
                isValid = false;
            }
            
            // Validar contraseña
            if (!password.value) {
                showError(password, 'Por favor ingresa tu contraseña');
                isValid = false;
            }
            
            // Si todo es válido, simular inicio de sesión
            if (isValid) {
                alert('Inicio de sesión exitoso. Redirigiendo...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        });
    }
}

// Barra de progreso de mi perfil
// En la función setupProgressBar, actualiza para que funcione en el dashboard
function setupProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressFill && progressPercentage) {
        // Calcular progreso general basado en cursos
        const courses = document.querySelectorAll('.course-card');
        let totalProgress = 0;
        
        courses.forEach(course => {
            const progressFill = course.querySelector('.progress-fill');
            const width = parseFloat(progressFill.style.width);
            totalProgress += isNaN(width) ? 0 : width;
        });
        
        const progress = courses.length > 0 ? totalProgress / courses.length : 0;
        
        // Actualizar visualmente
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}% completado`;
        
        // Animación suave
        setTimeout(() => {
            progressFill.style.transition = 'width 1s ease-in-out';
        }, 100);
    }
}

// 4. Funcionalidad de FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        
        if (question) {
            question.addEventListener('click', () => {
                // Cerrar todas las demás preguntas
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar la pregunta actual
                item.classList.toggle('active');
            });
        }
    });
}

// 5. Navegación activa
function setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== FUNCIONES AUXILIARES =====

// Validar formato de email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar error en formulario
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ff6b6b';
    error.style.marginTop = '5px';
    error.style.fontSize = '0.9rem';
    
    formGroup.appendChild(error);
    input.style.borderColor = '#ff6b6b';
}

// Resetear errores
function resetErrors(inputs) {
    inputs.forEach(input => {
        input.style.borderColor = '';
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const error = formGroup.querySelector('.error-message');
            if (error) error.remove();
        }
    });
}


// ===== INICIALIZA TODA LA PÁGINA CUANDO CARGA =====
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    setupFormValidation();
    setupProgressBar();
    setupFAQ();
    setupActiveNavigation();

});

