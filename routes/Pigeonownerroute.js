// routes/employeeRoutes.js
import express from 'express';
import { createOwner, deleteOwner, getallowner, getOwner, updateOwner, uploadImage } from '../controllers/Pigeonownercontroller.js';

const router = express.Router();

router.post('/owner',uploadImage, createOwner);

 router.get('/owners' ,getOwner);

 router.get('/allowners' ,getallowner);

 // Update Owner Route
router.put('/owners/:id', updateOwner);

// Delete Owner Route
router.delete('/owners/:id', deleteOwner);

// router.put('/employees/:id',updateEmployee);

// router.delete('/employees/:id',deleteEmployee);


export default router;
