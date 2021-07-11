var bcrypt = require('bcrypt');
module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;

};

module.exports.validatePassword = async (password, passwordInDb) => {
    const validationStatus = await bcrypt.compare(password, passwordInDb);
    return validationStatus;
};