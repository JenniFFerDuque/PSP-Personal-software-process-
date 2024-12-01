const tasksList = []

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

    // Obtener valores de los campos del formulario
    const taskTitle = document.querySelector('#taskTitle').value.trim();
    const taskDescription = document.querySelector('#taskDescription').value.trim();
    const startDate = document.querySelector('#startDate').value;
    const dueDate = document.querySelector('#dueDate').value;
    const errorMessage = document.getElementById('errorMessage');
    

    // Limpiar mensaje de error
    errorMessage.textContent = '';

    // Validaciones
    if (!taskTitle || !taskDescription || !startDate || !dueDate) {
        errorMessage.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    if (new Date(startDate) > new Date(dueDate)) {
        errorMessage.textContent = 'La fecha de inicio no puede ser posterior a la fecha de vencimiento.';
        return;
    }
    const id = generateId()
    tasksList.push({
        id,
        taskTitle,
        taskDescription,
        startDate,
        dueDate,
        createDate  : new Date().toISOString()
    })

    // Crear el elemento de tarea
    const taskContainer = document.getElementById('taskContainer');
    const taskElement = createTaskElement(id,taskTitle, taskDescription, startDate, dueDate);

    // Agregar la nueva tarea al contenedor
    taskContainer.appendChild(taskElement);

    // Limpiar los campos del formulario
    document.querySelector('#taskTitle').value = '';
    document.querySelector('#taskDescription').value = '';
    document.querySelector('#startDate').value = '';
    document.querySelector('#dueDate').value = '';

    saveBdtask()
}

function editTask(index) {
     // Limpiar los campos del formulario
    document.querySelector('#taskTitle').value = '';
    document.querySelector('#taskDescription').value = '';
    document.querySelector('#startDate').value = '';
    document.querySelector('#dueDate').value = '';

    console.log(index,tasksList)
    // obtento y verifico la tarea
    const task = tasksList[index]
    console.log(task)

    if (!task) {
        document.getElementById('errorMessage').taskContent = 'No se pudo cargar la tarea'
        return;
    }
    // Actualizo el formulario
    document.querySelector('#taskTitle').value = task.taskTitle;
    document.querySelector('#taskDescription').value = task.taskDescription;
    document.querySelector('#startDate').value = task.startDate;
    document.querySelector('#dueDate').value = task.dueDate;
    tasksList.splice(index, 1);
}

function generateId() {
    return new Date().getTime()*1000
}

// Función para crear el elemento de tarea
function createTaskElement(id, taskTitle, taskDescription, startDate, dueDate) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', 'round-border');

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerHTML = `
        <h3>${taskTitle}</h3>
        <p>${taskDescription}</p>
        <p><strong>Inicio:</strong> ${startDate}</p>
        <p><strong>Vencimiento:</strong> ${dueDate}</p>
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        let index = tasksList.map(x => {
            return x.id;
        }).indexOf(id);
        taskDiv.remove();
        tasksList.splice(index, 1);
        console.log(tasksList)
        saveBdtask()
    });

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
        let index = tasksList.map(x => {
            return x.id;
        }).indexOf(id);
        editTask(index);
        taskDiv.remove();
        saveBdtask()
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(buttonContainer);

    return taskDiv;
}

function saveBdtask() {
    localStorage.setItem('tasks',JSON.stringify(tasksList))
}

// Función para ordenar las tareas alfabéticamente por título
function renderOrderedTask() {
    const tasks = [...document.querySelectorAll('.task .task-content h3')];
    const taskContainer = document.getElementById('taskContainer');

    const orderedTasks = tasks
        .map(task => ({
            title: task.textContent,
            element: task.closest('.task')
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

    taskContainer.innerHTML = '';
    orderedTasks.forEach(task => {
        taskContainer.appendChild(task.element);
    });
}


function initializeTasks() {
    let initialTasks = []
    let bdtask = localStorage.getItem('tasks')
    if (bdtask && bdtask.length> 0) {
        initialTasks = JSON.parse(bdtask)
    }

    const taskContainer = document.getElementById('taskContainer')
    initialTasks.forEach((task, index) => {
        const { id,taskTitle, taskDescription, startDate, dueDate } = task
        const taskElement = createTaskElement(id,taskTitle,taskDescription,startDate,dueDate);
        taskContainer.appendChild(taskElement);
    })
}