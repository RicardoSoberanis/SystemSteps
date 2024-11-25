
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editProfile');
    const saveButton = document.getElementById('saveProfile');
    const inputs = document.querySelectorAll('.form-control');

    editButton.addEventListener('click', () => {
        inputs.forEach(input => input.disabled = false); 
        editButton.classList.add('d-none'); 
        saveButton.classList.remove('d-none'); 
    });

    saveButton.addEventListener('click', () => {
        const updatedData = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            university: document.getElementById('university').value,
            email: document.getElementById('email').value
        };
        console.log('Datos actualizados:', updatedData);

        inputs.forEach(input => input.disabled = true); 
        saveButton.classList.add('d-none'); 
        editButton.classList.remove('d-none'); 
    });
});
