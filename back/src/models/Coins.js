const { DataTypes } = require("sequelize");

module.exports = (sequalize) => {
    sequalize.define("coins", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        coins: {
            type: DataTypes.INTEGER
        },

        url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        types: {
            type: DataTypes.ENUM("MONEY", "DIAMANTE"),
            defaultValue: "MONEY",
        }
    }, { timestamps: false })
}