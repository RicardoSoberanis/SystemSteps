// Variables globales para guardar email y contraseña
let tempEmail = '';
let tempPassword = '';

async function checkEmail(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    tempEmail = email;
    tempPassword = confirmPassword;

    if (!email) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Error al verificar el email.');
            return;
        }

        const data = await response.json();
        if (data.success) {
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            if (registerModal) {
                registerModal.hide();
            }

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
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', tempEmail);
    formData.append('password', tempPassword);
    formData.append('usuario', document.getElementById('registerUsername').value);
    formData.append('name', document.getElementById('registerFullName').value);
    formData.append('edad', document.getElementById('registerAge').value);
    formData.append('carrera', document.getElementById('registerCareer').value);
    formData.append('gitHubUser', document.getElementById('registergitHubUser').value);
    formData.append('linkedInUser', document.getElementById('registerlinkedInUser').value);

    const imageFile = document.getElementById('registerimageProfile').files[0];
    if (imageFile) {
        formData.append('imageProfile', imageFile);
    }

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: formData, // No establecer Content-Type, fetch lo hará automáticamente
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Registro completado exitosamente. Ahora estás logueado.');

            const registerInfoModal = bootstrap.Modal.getInstance(document.getElementById('registerInfoModal'));
            registerInfoModal.hide();

            // Redirigir al usuario a la página principal o actualizar la UI
            window.location.href = '/home';
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
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Inicio de sesión exitoso');

            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();

            // Redirigir al usuario a la página principal o actualizar la UI
            window.location.href = '/home';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
}