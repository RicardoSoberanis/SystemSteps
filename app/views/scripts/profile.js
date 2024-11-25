
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editProfile');
    const saveButton = document.getElementById('saveProfile');
    const inputs = document.querySelectorAll('.form-control');

    editButton.addEventListener('click', () => {
        inputs.forEach(input => input.disabled = false); // Habilitar los campos
        editButton.classList.add('d-none'); // Ocultar el botón "Editar"
        saveButton.classList.remove('d-none'); // Mostrar el botón "Guardar"
    });

    saveButton.addEventListener('click', () => {
        const updatedData = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            university: document.getElementById('university').value,
            email: document.getElementById('email').value
        };
        console.log('Datos actualizados:', updatedData);

        inputs.forEach(input => input.disabled = true); // Deshabilitar los campos
        saveButton.classList.add('d-none'); // Ocultar el botón "Guardar"
        editButton.classList.remove('d-none'); // Mostrar el botón "Editar"
    });
});
