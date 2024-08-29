import express from 'express';
import { requiresingnin } from '../middlewares/Authmiddleware.js';
import { deleteClubController, getAllClubsController, getClubBySlugController, logincontroller, registercontroller, testcontroller, updateClubController } from '../controllers/Clubscontroller.js';

const router = express.Router();

router.post('/register', registercontroller);


router.get('/clubs', getAllClubsController);

router.put('/clubs/:id', updateClubController);

router.delete('/clubs/:id', deleteClubController);

router.post('/login',logincontroller);

router.get('/test',requiresingnin,testcontroller)

router.get('/clubs/:slug', getClubBySlugController);

router.get('/user-auth', requiresingnin, (req, res) => {
    res.status(201).send({ ok: true });
});

export default router;
