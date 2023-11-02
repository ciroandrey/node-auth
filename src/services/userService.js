const User = require('../models/user');

const createUser = async (userData) => {
    const user = new User(userData);
    return user.save();
};

const getAllUsers = async () => {
    return User.find();
};

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Erro ao atualizar o usuário');
    }
};

const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
            throw new Error('Usuário não encontrado');
        }
        return deletedUser;
    } catch (error) {
        throw new Error('Erro ao excluir o usuário');
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByUsername
};
