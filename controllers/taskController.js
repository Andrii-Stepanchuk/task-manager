const Task = require('../models/Task');
const {validationResult} = require('express-validator');

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    checkValidationSuccessful(req);
    try {
        const task = await Task.findById(req.params.id);
        checkTaskExists(task);
        res.status(200).json({task});
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    checkValidationSuccessful(req);
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        checkTaskExists(task);
        res.status(200).json({task});
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        checkTaskExists(task);
        res.status(200).json({task});
    } catch (error) {
        next(error);
    }
};

const checkTaskExists = (task) => {
    if (!task) {
        const error = new Error('Could not find task.');
        error.statusCode = 404;
        throw error;
    }
}

const checkValidationSuccessful = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}
