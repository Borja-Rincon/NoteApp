const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;

exports.create = (req, res) =>  {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const note = {
        title: req.body.title,
        description: req.body.description,
        filename: req.file ? req.file.filename : ""
    };

    Note.create(note)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        });
    });
};

exports.findAll = (req, res) =>  {
    Note.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Note.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot find Note with id=${id}.`
                });
            }

            if (data.filename) {
                data.imageUrl = `http://localhost:8080/images/${data.filename}`;
            }

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Note with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    
    const noteData = {
        title: req.body.title,
        description: req.body.description,
        filename: req.file ? req.file.filename : undefined
    };

    if (!req.file) {
        delete noteData.filename;  
    }

    Note.update(noteData, {
        where: { id: id }
    })
    .then(num => {
        if (num[0] === 0) {
            return res.status(404).send({
                message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`
            });
        }
        res.send({
            message: "Note was updated successfully."
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Note with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Note.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 0) {
            return res.status(404).send({
                message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
            });
        }
        res.send({
            message: "Note was deleted successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Note with id=" + id
        });
    });
};