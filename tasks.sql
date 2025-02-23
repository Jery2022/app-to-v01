CREATE DATABASE ejyr_todo_bdd;

USE ejyr_todo_bdd;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL
);
