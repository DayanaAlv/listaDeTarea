document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');

    let tasks = [
        { id: 1, title: 'Tarea 1: Comprar alimentos', completed: false },
        { id: 2, title: 'Tarea 2: Llamar al dentista', completed: true },
        { id: 3, title: 'Tarea 3: Estudiar para el examen', completed: false }
    ];

    function updateSummary() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;

        totalTasks.textContent = `Total de tareas: ${total}`;
        completedTasks.textContent = `Tareas completadas: ${completed}`;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                renderTasks();
                updateSummary();
            });
            li.appendChild(checkbox);

            const taskTitle = document.createElement('span');
            taskTitle.textContent = task.title;
            if (task.completed) {
                taskTitle.classList.add('completed');
                taskTitle.textContent += ' - Realizado';
            }
            li.appendChild(taskTitle);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete');
            deleteButton.onclick = () => {
                tasks.splice(index, 1);
                renderTasks();
                updateSummary();
                updateTotalTaskCount();
            };
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });

        updateTotalTaskCount();
    }

    function addTask() {
        const taskTitle = taskInput.value.trim();
        if (taskTitle === '') return;

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            completed: false
        };

        tasks.push(newTask);

        taskInput.value = '';
        renderTasks();
        updateSummary();
        updateTotalTaskCount();
    }

    function updateTotalTaskCount() {
        totalTasks.textContent = `Total de tareas: ${tasks.length}`;
    }

    document.querySelector('button').addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Render the initial tasks on page load
    renderTasks();
    updateSummary();
});






