const taskListElement = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// Fonction pour récupérer et afficher les tâches
function getTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
        .then(tasks => {
        taskListElement.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.task}
                            <button onclick="editTask(${task.id})">Modifier</button>
                            <button onclick="deleteTask(${task.id})">Supprimer</button>`;
            taskListElement.appendChild(li);
        });
    });
}

// Fonction pour ajouter une tâche
function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue) {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: taskValue })
    })
    .then(response => response.json())
    .then(() => {
      taskInput.value = '';
      getTasks();
    });
  }
}

// Fonction pour modifier une tâche
function editTask(id) {
  const newTaskValue = prompt('Modifier la tâche:');
  if (newTaskValue) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: newTaskValue })
    })
    .then(response => response.json())
    .then(() => {
      getTasks();
    });
  }
}

// Fonction pour supprimer une tâche
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    // Vérifiez si la réponse est OK
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la tâche');
    }
    // Si la réponse est vide, on ne tente pas de la parser
    if (response.status === 204) {
      console.log('Tâche supprimée avec succès');
      return; // Pas besoin de retourner des données
    }
    return response.json(); // Si la réponse contient des données, les parser
  })
  .then(data => {
    if (data) {
      console.log('Réponse du serveur:', data);
    }
    getTasks(); // Récupérer la liste des tâches après la suppression
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
}


// Charger les tâches au chargement de la page
getTasks();
