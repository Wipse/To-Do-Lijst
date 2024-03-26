import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getTasks(){
    const [rows] = await pool.query(`SELECT * FROM todo_app`)
    return rows
} 

export async function getTask(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM todo_app 
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function deleteTask(id) {
    await pool.query(`
    DELETE FROM todo_app 
    WHERE id = ?
    `, [id]);
}

export async function createTask(title, todo, shouldhappen) {
    const [result] = await pool.query(`
    INSERT INTO todo_app (title, todo, shouldhappen)
    VALUES (?, ?, ?)
    `, [title, todo, shouldhappen])
    const id = result.insertId
    return getTask(id)}