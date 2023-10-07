const User = require("../Model/user.Model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {

    try {
        const { firstName, lastName, email, password, mobile } = req.body;
        let newuser = await User.findOne({ firstName: firstName });
        if (newuser) {
            return res.json({ message: "user is Alrady exist" });
        }

        let salt = await bcrypt.genSalt(10);
        let hasPassword = await bcrypt.hash(password, salt);

        newuser = await User.create({
            firstName,
            lastName,
            email,
            password: hasPassword,
            mobile,
        });
        res.status(201).json({ User: newuser, message: "new user add" })
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    };
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const registerUser = await User.findOne({ email: email });
        if (!registerUser) {
            return res.status(404).json({ message: "user Not Found" });
        }

        let matchPassword = await bcrypt.compare(password, registerUser.password);
        if (!matchPassword) {
            return res.json({ message: "Password Is Incorrect" })
        };
        let token = jwt.sign({ userId: registerUser._id }, process.env.SECRET_KEY);

        res.json({ registerUser, message: "Login SucessFully....", token: token })

    } catch (error) {
        console.log(error);
        res.json({ message: error });
    };
}

exports.userProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: "user not Found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        if (password === confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            const hasPassword = await bcrypt.hash(password, salt);

            let changePassword = await User.findByIdAndUpdate(
                req.user._id,
                { password: hasPassword },
                { new: true })
            res.json({ message: "password Is Updated" });
        }
        else {
            return res.json({ message: "password and ConifrmPassword Is Not Match" })
        };
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
}
