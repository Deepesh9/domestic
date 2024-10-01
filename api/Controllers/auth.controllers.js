import User from '../Models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, location, phone, email, password, confirmpassword } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(errorHandler(400, 'User already exists'));

        // Hash the password and save the new user
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, location,phone, email, password: hashedPassword, confirmpassword: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user and verify password
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        // Create and set JWT
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...rest } = validUser._doc; // Exclude password
        res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
            .status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            // User exists, generate and set JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: _, ...rest } = user._doc; // Exclude password
            res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
                .status(200).json(rest);
        } else {
            // Create new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000),
                location: req.body.location,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                confirmpassword: hashedPassword
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: _, ...rest } = newUser._doc; // Exclude password
            res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
                .status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
};
