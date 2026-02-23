const express = require('express');
const app = express();
const port = 8000;
const mysql = require('mysql2/promise');

app.use(express.json());

let users = [];
let counter = 1;
let conn = null;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });
}

app.get('/testdb', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });
        const [results] = await connection.query('SELECT * FROM users');
        connection.end();
        res.json(results);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Database query error' });
    }
});

/**  
 * GET /user
 * post /user
 * get /user/:id
 * put /user/:id
 * delete /user/:id
 */

//get all users with fullname
app.get('/users', (req, res) => {
    const filteredUsers = users.map(user => {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            fullname: `${user.firstname} ${user.lastname}`
        };
    });
    res.json(filteredUsers);
});

//path GET /user/:id
app.get('/user/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        
        // Validate id parameter
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Error: Invalid user ID'
            });
        }
        
        let selectedUser = users.findIndex(user => user.id === id);
        
        if (selectedUser === -1) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        
        res.json(users[selectedUser]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({
            message: 'Error fetching user',
            error: err.message
        });
    }
});

//get all users
app.get('/users', (req, res) => {
    res.json(users);
});

//post a user
app.post('/user', (req, res) => {
    try {
        let user = req.body;
        
        // Validate required fields
        if (!user.firstname || !user.lastname) {
            return res.status(400).json({
                message: 'Error: firstname and lastname are required'
            });
        }
        
        user.id = counter++;
        users.push(user);
        res.json({
            message: 'User added',
            user: user
        });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({
            message: 'Error adding user',
            error: err.message
        });
    }
});

//put a user by id
app.put('/user/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let updatedUser = req.body;

    let selectedIndex = users.findIndex(user => user.id === id);

    users[selectedIndex].firstname = updatedUser.firstname;
    users[selectedIndex].lastname = updatedUser.lastname;
    users[selectedIndex].age = updatedUser.age;
    users[selectedIndex].gender = updatedUser.gender;
    res.json({
        message: 'User updated',
        user: users[selectedIndex]
    });
});

//delete a user by id
app.delete('/user/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let userIndex = users.findIndex(u => u.id === id);

    if (userIndex !== -1) {
        let deletedUser = users.splice(userIndex, 1);
        res.json({
            message: 'User deleted',
            user: deletedUser[0]
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get('/testdb-new', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });
        const [results] = await connection.query('SELECT * FROM users');
        connection.end();
        res.json(results);
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ error: 'Database connection error' });
    }
});