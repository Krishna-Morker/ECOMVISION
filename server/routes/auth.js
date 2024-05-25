import express from 'express';
import passport from 'passport';
import { login, register, logOut, forgotpost, resetpass, changepass } from '../controllers/userController.js';
import '../config/passport.js'; // Assuming this configures passport

const router = express.Router();

router.post('/forgot-password', forgotpost);
router.post('/reset-password', changepass);
router.get('/reset-password/:id/:token', resetpass);
router.post('/login', login);
router.post('/register', register);
router.get('/logout/:id', logOut);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login'
}), async (req, res) => {
    const user = req.user;
    const token = await user.generateAuthToken();

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 1200000),
        httpOnly: true,
        // sameSite: 'none',
        // secure: true
    });
    res.redirect('http://localhost:3000/home');
});

export default router;
