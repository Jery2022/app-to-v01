const db = require('../config/database');

const Task = {
  getAll: (callback) => {
    db.query('SELECT * FROM tasks', callback);
  },
  create: (task, callback) => {
    db.query('INSERT INTO tasks (task) VALUES (?)', [task.task], callback);
  },
  update: (id, task, callback) => {
    db.query('UPDATE tasks SET task = ? WHERE id = ?', [task.task, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
  }
};

module.exports = Task;
