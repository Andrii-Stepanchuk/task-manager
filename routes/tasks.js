const express = require('express');
const taskController = require('../controllers/taskController');
const {body} = require('express-validator');
const router = express.Router();

router
    .route('/')
    .get(taskController.getAllTasks)
    .post(body('name').isLength({min: 3}), taskController.createTask);

router
    .route('/:id')
    .get(taskController.getTask)
    .patch(body('name').isLength({min: 3}), taskController.updateTask)
    .delete(taskController.deleteTask)

module.exports = router;