// Configurar marked para que sea más seguro
        marked.setOptions({
            sanitize: true,
            breaks: true
        });

        const editor = CodeMirror.fromTextArea(document.getElementById("markdown-editor"), {
            mode: "markdown",
            theme: "monokai",
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            tabSize: 2
        });

        // Actualizar preview en tiempo real
        editor.on("change", () => {
            const markdownText = editor.getValue();
            const htmlContent = marked.parse(markdownText);
            document.getElementById("preview").innerHTML = htmlContent;
        });

        // Función para guardar el proyecto
        function guardarProyecto() {
            const contenido = editor.getValue();
            // Aquí puedes implementar la lógica para guardar el contenido
            // Por ejemplo, guardarlo en localStorage o enviarlo a un servidor
            localStorage.setItem('markdown-content', contenido);
            alert('Proyecto guardado exitosamente');
        }

        // Cargar contenido guardado si existe
        const contenidoGuardado = localStorage.getItem('markdown-content');
        if (contenidoGuardado) {
            editor.setValue(contenidoGuardado);
        }