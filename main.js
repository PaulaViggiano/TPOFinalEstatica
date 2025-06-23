// ===== FUNCIONES GENERALES =====

// 1. Cambiar entre modo claro y oscuro
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

// 2. Validación básica de formularios
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
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// 3. Barra de progreso
function setupProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressFill && progressPercentage) {
        // Simular progreso del 35%
        const progress = 35;
        
        // Actualizar visualmente
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}% completado`;
    }
}

// 4. Funcionalidad de FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            // Cerrar todas las respuestas
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.display = 'none';
                    ans.parentElement.classList.remove('active');
                }
            });
            
            // Alternar la respuesta actual
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.parentElement.classList.remove('active');
            } else {
                answer.style.display = 'block';
                this.parentElement.classList.add('active');
            }
        });
    });
}

// 5. Menú de navegación
function setupNavigation() {
    // Resaltar página activa
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Menú móvil simple
    const menuToggle = document.querySelector('.nav-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('show');
        });
    }
}

// ===== FUNCIONES AUXILIARES =====

// Mostrar error en formulario
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    
    // Limpiar errores anteriores
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Crear mensaje de error
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.marginTop = '5px';
    errorElement.style.fontSize = '0.9rem';
    
    // Añadir después del input
    formGroup.appendChild(errorElement);
    
    // Resaltar input
    input.style.borderColor = '#ff6b6b';
    
    // Eliminar error después de 3 segundos
    setTimeout(() => {
        errorElement.remove();
        input.style.borderColor = '';
    }, 3000);
}

// Validar formato de email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== INICIALIZAR TODO CUANDO LA PÁGINA CARGA =====
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    setupFormValidation();
    setupProgressBar();
    setupFAQ();
    setupNavigation();
});