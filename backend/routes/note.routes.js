const authJwt = require('../middleware/authJwt.js');

module.exports = app => {
    const notes = require("../controllers/note.controller.js");
    var upload = require('../multer/upload.js');

    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken], upload.single('file'), notes.create);
    router.get("/", [authJwt.verifyToken], notes.findAll);
    router.get("/:id", [authJwt.verifyToken], notes.findOne);
    router.put("/:id", [authJwt.verifyToken], upload.single('file'), notes.update);
    router.delete("/:id", [authJwt.verifyToken], notes.delete);

    app.use('/api/notes', router);
};