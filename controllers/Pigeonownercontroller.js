import Pigeonwnermodal from "../models/Pigeonwnermodal.js";
import slugify from "slugify";
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// Create employee with file upload
export const createOwner = async (req, res) => {
  try {
    const {
      name,
      contacts,
      city,
    } = req.body;

    const owner = new Pigeonwnermodal({
      name,
      contacts,
      city,
      slug: `${name}-${Date.now()}`,
      image: req.file ? req.file.filename : null,
    });

    await owner.save();
    res.status(201).json({ success: true, data: owner });
  } catch (error) {
    console.error('Error creating Owner:', error);
    res.status(500).json({ success: false, error: 'Server Error', details: error.message });
  }
};
// Middleware for handling file uploads
export const uploadImage = upload.single('image');
//=========================================================================
//get data

export  const getOwner = async (req, res) => {
    try {
      const owner = await Pigeonwnermodal.find({}, 'name ');
      res.status(200).send({
        success: true,
        message: 'Clubs fetched successfully',
        owner
    });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //==========================================================================
  //get all data

  export  const getallowner =  async (req, res) => {
    try {
      const owners = await Pigeonwnermodal.find();
      res.json(owners);
    } catch (error) {
      console.error('Error fetching owners:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //============================================================================
  //update

  export const updateOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedOwner = await Pigeonwnermodal.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      
      if (!updatedOwner) {
        return res.status(404).json({ success: false, message: 'Owner not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Owner updated successfully',
        owner: updatedOwner,
      });
    } catch (error) {
      console.error('Error updating owner:', error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };
  
  // Delete Owner
  export const deleteOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOwner = await Pigeonwnermodal.findByIdAndDelete(id);
  
      if (!deletedOwner) {
        return res.status(404).json({ success: false, message: 'Owner not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Owner deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting owner:', error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };