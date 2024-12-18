module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    return Note;
};