import express from "express";
import { getTasks, getTask, createTask, deleteTask } from "./database.js";

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs'); // Set EJS as the template engine

app.get('/todo_list', async (req, res) => {
    const tasks = await getTasks();
    res.render('pages/index', { tasks }); 
});

app.get('/todo_list/:id', async (req, res) => {
    const id = req.params.id;
    const tasks = await getTask(id);
    res.render('todo_list', { tasks }); 
});

app.post('/todo_list', async (req, res) => {
    const { title, todo, shouldhappen } = req.body;
    try {
        const task = await createTask(title, todo, shouldhappen);
        res.status(201).send(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Er ging wat fout bij het aanmaken van de task!');
    }
});

app.delete('/todo_list/:id', async (req, res) => {
    const id = req.params.id;
    const task = await deleteTask(id);
    res.status(204).send();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('server started on port 8080');
});