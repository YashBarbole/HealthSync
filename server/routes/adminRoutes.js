// adminRoutes.js
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.js';
const router = express.Router();

router.post('/adminregister', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/adminlogin', (req, res, next) => {
    passport.authenticate('admin-local', (err, user) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.json({
                message: 'Admin logged in successfully',
                admin: {
                    name: user.name,
                    email: user.email,
		    isAdmin: true, //The backend now returns isAdmin
                }
            });
        });
    })(req, res, next);
});

export default router;
