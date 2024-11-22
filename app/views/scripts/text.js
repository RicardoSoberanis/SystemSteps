// Configurar marked para que sea más seguro
marked.setOptions({
    sanitize: false, // Permitimos HTML para imágenes
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

function insertFormat(type) {
    const selections = {
        bold: { text: '**texto en negrita**', start: 2, end: 17 },
        italic: { text: '*texto en cursiva*', start: 1, end: 16 },
        strike: { text: '~~texto tachado~~', start: 2, end: 15 },
        h1: { text: '# Título 1\n', start: 2, end: 9 },
        h2: { text: '## Título 2\n', start: 3, end: 10 },
        h3: { text: '### Título 3\n', start: 4, end: 11 },
        ul: { text: '- Elemento de lista\n', start: 2, end: 17 },
        ol: { text: '1. Elemento de lista\n', start: 3, end: 18 },
        task: { text: '- [ ] Tarea\n', start: 6, end: 11 },
        link: { text: '[texto del enlace](url)', start: 1, end: 15 },
        code: { text: '`código`', start: 1, end: 7 },
        quote: { text: '> Cita\n', start: 2, end: 6 }
    };

    const selection = selections[type];
    const doc = editor.getDoc();
    const cursor = doc.getCursor();

    doc.replaceSelection(selection.text);
    doc.setSelection(
        { line: cursor.line, ch: cursor.ch + selection.start },
        { line: cursor.line, ch: cursor.ch + selection.end }
    );
    editor.focus();
}

function showImageDialog() {
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

function insertImage() {
    const urlInput = document.getElementById('imageUrlInput');
    const fileInput = document.getElementById('imageFileInput');
    
    if (urlInput.value) {
        const imageMarkdown = `![imagen](${urlInput.value})`;
        const doc = editor.getDoc();
        doc.replaceSelection(imageMarkdown + '\n');
    } else if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageMarkdown = `![imagen](${e.target.result})`;
            const doc = editor.getDoc();
            doc.replaceSelection(imageMarkdown + '\n');
        };
        
        reader.readAsDataURL(file);
    }

    bootstrap.Modal.getInstance(document.getElementById('imageModal')).hide();
    urlInput.value = '';
    fileInput.value = '';
}

// Función para guardar el proyecto
function guardarProyecto() {
    const contenido = editor.getValue();
    localStorage.setItem('markdown-content', contenido);
    alert('Proyecto guardado exitosamente');
}

// Cargar contenido guardado si existe
const contenidoGuardado = localStorage.getItem('markdown-content');
if (contenidoGuardado) {
    editor.setValue(contenidoGuardado);
}