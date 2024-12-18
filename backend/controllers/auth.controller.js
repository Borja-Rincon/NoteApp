const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Email and password are required!"
        });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({
                message: "Error encrypting password"
            });
        }

        const user = {
            email: req.body.email,
            password: hashedPassword
        };

        User.create(user)
            .then(data => {
                res.status(201).send({
                    message: "User registered successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Email and password are required!"
        });
    }

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found!"
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.status(401).send({
                        message: "Invalid password!"
                    });
                }

                const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
                    expiresIn: 86400
                });

                res.status(200).send({
                    message: "Login successful!",
                    token: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while logging in."
            });
        });
};