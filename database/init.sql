CREATE DATABASE IF NOT EXISTS ts_jira;

USE ts_jira;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    login VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE projects(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250)
);

CREATE TABLE stories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    priority VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    createdDate VARCHAR(50) NOT NULL,
    assignedToId INT,
    userId INT NOT NULL,
    projectId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (assignedToId) REFERENCES users(id),
    FOREIGN KEY (projectId) REFERENCES projects(id)
);

CREATE TABLE tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    priority VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    createdDate DATE NOT NULL,
    expectedEndTime DATE,
    startDate DATE,
    endDate DATE,
    storyPoint INT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(name, surname, role, login, password)
VALUES 
    ("Sebastian", "Oraczek", "admin", "admin", "admin"),
    ("Jan", "Kowalski", "devops", "devops", "devops"),
    ("Joanna", "Kaczmarczyk", "developer", "developer", "developer");