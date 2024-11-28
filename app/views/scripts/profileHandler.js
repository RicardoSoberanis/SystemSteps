const token = localStorage.token;

try {
    const response = await fetch("http://localhost:3000/users/find", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Error: ${errorData.message || "No autorizado"}`);
        return;
    }

    sessionStorage.user = response.user;

    alert("Proyecto guardado exitosamente");
} catch (error) {
    console.error("Error al guardar el proyecto:", error);
    alert("Error en la conexión con el servidor.");
}


