module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const authJwt = require("../middleware/authJwt.js");

    var router = require("express").Router();

    // Ruta para registrarse
    router.post("/signup", auth.signup);

    // Ruta para iniciar sesión
    router.post("/login", auth.login);

    // Rutas protegidas con autenticación
    router.get("/profile", [authJwt.verifyToken], (req, res) => {
        res.status(200).send({
            message: "This is a protected route"
        });
    });

    app.use("/api/auth", router);
};