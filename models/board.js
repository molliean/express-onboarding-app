const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completeWithin: {
        type: String,
        enum: ['1 day', '1 week', '2 weeks', '30 days', '60 days', '90 days'],
    },
    category: {
        type: String,
        enum: ['HR Setup', 'Account Setup', 'Meet the Team', 'Dev Setup', 'Company Context'],
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: String,
    }
});

const boardSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
});

module.exports = mongoose.model('Board', boardSchema);