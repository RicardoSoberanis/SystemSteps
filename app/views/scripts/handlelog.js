// Variables globales para guardar email y contraseña
let tempEmail = '';
let tempPassword = '';

async function checkEmail(event) {
    // Evitar que el formulario se envíe y recargue la página
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    tempEmail = email;
    tempPassword = confirmPassword;

    // Validar que el email no esté vacío
    if (!email) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        // Hacer la solicitud al backend
        const response = await fetch('http://localhost:3000/auth/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }), // Envía el email como JSON
        });

        // Manejar errores HTTP
        if (!response.ok) {
            const errorData = await response.json(); // Extrae el mensaje del error
            alert(errorData.message || 'Error al verificar el email.');
            return;
        }

        const data = await response.json(); // Convierte la respuesta en JSON
        if (data.success) {
            // Cerrar el modal actual
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            if (registerModal) {
                registerModal.hide();
            }

            // Abrir el siguiente modal
            const registerInfoModalElement = document.getElementById('registerInfoModal');
            if (registerInfoModalElement) {
                const registerInfoModal = new bootstrap.Modal(registerInfoModalElement);
                registerInfoModal.show();
            } else {
                console.error('El modal registerInfoModal no existe en el DOM.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    }
}

async function completeRegistration(event) {
    event.preventDefault(); // Evita que se recargue la página

    const usuario = document.getElementById('registerUsername').value;
    const name = document.getElementById('registerFullName').value;
    const edad = document.getElementById('registerAge').value;
    const carrera = document.getElementById('registerCareer').value;

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: tempEmail, password: tempPassword, usuario, name, edad, carrera }),
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token); // Guarda el token en localStorage
            alert('Registro completado exitosamente. Ahora estás logueado.');

            // Cerrar modal de registro
            const registerInfoModal = bootstrap.Modal.getInstance(document.getElementById('registerInfoModal'));
            registerInfoModal.hide();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al completar el registro.');
    }
}

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token); // Guarda el token en localStorage
            alert('Inicio de sesión exitoso');

            // Cerrar modal de inicio de sesión
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
}