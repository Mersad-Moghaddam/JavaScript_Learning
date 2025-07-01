import express from "express";
import {createUser,getUsers,getUserById,deleteUserById,patchUserById} from '../controllers/user.js'; // Importing the createUser function

const router = express.Router();

// Route to get all users
router.get('/',getUsers) 

// Route to create a new user
router.post('/',createUser )

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to delete a user by ID
router.delete('/:id',deleteUserById )

// Route to update a user by ID
router.patch('/:id',patchUserById )
export default router;