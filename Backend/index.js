const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = [];
let counter = 1;

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter++;
    users.push(user);
    res.json({
        message: 'User added',
        user: user
    });
});

app.put('/user/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let userIndex = users.findIndex(u => u.id === id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body, id: id };
        res.json({
            message: 'User updated',
            user: users[userIndex]
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

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