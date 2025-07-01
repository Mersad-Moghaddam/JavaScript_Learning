import {v4 as uuidv4} from 'uuid'; // Importing uuid for unique IDs

// Move users array here so it's accessible to all controller functions
const users = [
    {
        name: "john",
        age: 20,
        email: "test5tU@example.com",
        id: "ff59dbe6-5dd0-4e37-b450-b366b1c7fa86"
    },
    {
        name: "john",
        age: 20,
        email: "test5tU@example.com",
        id: "38b38849-28c5-4b9f-a8b1-bd221e50241a"
    }
];

export const createUser = (req, res) => {
    const newUser = req.body;
    console.log('Received a POST request with data:', newUser);
    const userId = uuidv4(); // Generate a unique ID for the new user
    const userWithId = {
        ...newUser,
        id: userId // Add the unique ID to the new user object
    };
    console.log('New user with ID:', userWithId);
    users.push(userWithId);
}

export const getUsers =(req, res) => {
    console.log("users GET request received");
    res.send(users);
}

export const getUserById = (req, res) => {
    const userId = req.params.id;
    console.log(`Received a GET request for user with ID: ${userId}`);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({message: 'User not found'});
    }
}

export const deleteUserById = (req, res) => {
    const userId = req.params.id;
    console.log(`Received a DELETE request for user with ID: ${userId}`);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send({message: 'User with deleted successfully'});
    } else {
        res.status(404).send({message: 'User not found'});
    }
}

export const patchUserById = (req, res) => {
    const userId = req.params.id;
    console.log(`Received a PATCH request for user with ID: ${userId}`);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const updatedUser = {...users[userIndex], ...req.body};
        users[userIndex] = updatedUser;
        res.send("User updated successfully");
    } else {
        res.status(404).send({message: 'User not found'});
    }
}