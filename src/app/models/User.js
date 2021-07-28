module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
    });

    return Users;

}