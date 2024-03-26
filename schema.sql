CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todo_app (
	id integer PRIMARY KEY auto_increment,
    title VARCHAR(255) NOT NULL,
    todo TEXT NOT NULL,
    shouldhappen TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO todo_app (title, todo, shouldhappen)
VALUES
('School', 'Werken aan Angular Project', '26.03.2024'),
('School', 'Boek Mobile First uitlezen', '29.03.2024');