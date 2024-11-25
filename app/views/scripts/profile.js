
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editProfile');
    const saveButton = document.getElementById('saveProfile');
    const inputs = document.querySelectorAll('.form-control');

    if(!editButton||!saveButton||inputs.length ==0){
        console.error("Elementos rrquwridos no encontrados");
        return;
    }

    editButton.addEventListener('click', () => {
        console.log('Edit button clickeado');
        inputs.forEach(input => {
            input.disabled = false });

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
