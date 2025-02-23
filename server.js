const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database.js'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Récupérer toutes les tâches
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur serveur' });
        return;
      }
      res.json(results); // Envoie les résultats au format JSON
    });
  });
  

// Créer une nouvelle tâche
app.post('/tasks', (req, res) => {
    if (!req.body || !req.body.task) {
        return res.status(400).send('Tâche requise');
        }
    const task = req.body.task;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, task });
    });
});

// Mettre à jour une tâche par ID
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;
  
  db.query('UPDATE tasks SET task = ? WHERE id = ?', [updatedTask, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) return res.status(404).send('Tâche non trouvée');
    res.json({ id, task: updatedTask });
  });
});

// Supprimer une tâche par ID
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) return res.status(404).send('Tâche non trouvée');
    console.log('alerte vous avez supprimé une tache');
    res.status(204).send('Tâche supprimée avec succès');  
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à l'adresse http://localhost:${port}`);
});
