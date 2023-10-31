// api.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

// Students CRUD operations
router.get('/students', async (req, res) => {
  try {
    const allStudents = await pool.query('SELECT * FROM student');
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/students', async (req, res) => {
  const { name, email, contact_no, date_of_birth } = req.body;
  try {
    const newStudent = await pool.query(
      'INSERT INTO student (name, email, contact_no, date_of_birth) VALUES($1, $2, $3, $4) RETURNING *',
      [name, email, contact_no, date_of_birth]
    );
    res.json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, contact_no, date_of_birth } = req.body;
  try {
    const updateStudent = await pool.query(
      'UPDATE student SET name = $1, email = $2, contact_no = $3, date_of_birth = $4 WHERE id = $5 RETURNING *',
      [name, email, contact_no, date_of_birth, id]
    );
    res.json(updateStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteStudent = await pool.query('DELETE FROM student WHERE id = $1', [id]);
    res.json(`Student with ID ${id} is deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
