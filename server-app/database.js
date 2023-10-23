//const mysql = require('mysql')
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
  const [rows] = await pool.query("select * from employees limit 10")
  return rows;
}

export async function getNote(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM employees
  WHERE emp_no = ?
  `, [id])
  return rows[0]
}

export async function createNote(birth_date, first_name, last_name, gender, hire_date) {
  const [result] = await pool.query(`
  INSERT INTO employees (birth_date,first_name, last_name, gender, hire_date)
  VALUES (?,?, ?,?, ?)
  `, [birth_date, first_name, last_name, gender, hire_date ])
  return result
}

//const notes = await getAllnotes()
//console.log(notes)

//const note = await getNote(10001)
//console.log(note)

//const result = await createNote("1960-06-18","Craig", "Mullins", "M", "1993-10-25")
//console.log(result)

