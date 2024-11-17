// Función para inicializar la fecha en la interfaz
document.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    document.getElementById('dateNumber').textContent = date.getDate();
    document.getElementById('dateMonth').textContent = date.toLocaleString('es-ES', { month: 'short' });
    document.getElementById('dateYear').textContent = date.getFullYear();
    document.getElementById('dateText').textContent = date.toLocaleString('es-ES', { weekday: 'long' });


 // Llamar a la función para cargar las tareas iniciales
    initializeTasks();
});

// Función para agregar una nueva tarea
function addNewTask(event) {
    if (event) {
        event.preventDefault();
    }

    const taskText = document.querySelector('#taskInput').value.trim();
    if (taskText === '') return;

    const taskContainer = document.getElementById('taskContainer');
    const taskElement = createTaskElement(taskText);
    
    taskContainer.appendChild(taskElement);
    document.querySelector('#taskInput').value = '';
}

// Función para crear el elemento de tarea
function createTaskElement(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', 'round-border');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => taskDiv.remove());

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(deleteButton);

    return taskDiv;
}

// Función para ordenar las tareas alfabéticamente
function renderOrderedTask() {
    const tasks = [...document.querySelectorAll('.task span')];
    const taskContainer = document.getElementById('taskContainer');
    
    const orderedTasks = tasks
        .map(task => task.textContent)
        .sort((a, b) => a.localeCompare(b));

    taskContainer.innerHTML = '';
    orderedTasks.forEach(taskText => {
        const taskElement = createTaskElement(taskText);
        taskContainer.appendChild(taskElement);
    });
}

// Función para inicializar una lista de tareas predeterminadas
function initializeTasks() {
    
    // TODO : buscar EN UNA BD
    const initialTasks = [
        "Comprar leche",
        "Pagar facturas",
        "Revisar correos",
        "Hacer ejercicio",
        "Llamar al dentista",
        "Planificar vacaciones",
        "Actualizar CV",
        "Leer un libro",
        "Limpiar la casa",
        "Cocinar la cena",
        "Comprar un regalo",
        "Organizar archivos",
        "Ver una película",
        "Salir a caminar",
        "Estudiar JavaScript",
        "Regar las plantas",
        "Ir al supermercado",
        "Jugar videojuegos",
        "Escribir en el diario",
        "Arreglar la bicicleta"
    ];

    const taskContainer = document.getElementById('taskContainer');

    initialTasks.forEach(taskText => {
        const taskElement = createTaskElement(taskText);
        taskContainer.appendChild(taskElement);
    });
}
