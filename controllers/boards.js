// controllers/boards.js

const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const verifyToken = require('../middleware/verify-token');

// ++++++++++++++PROTECTED ROUTES+++++++++++++
router.use(verifyToken);

// create new board
router.post('/', async (req, res) => {
    try {
        req.body.owner = req.user._id
        const board = await Board.create(req.body);
        board._doc.owner = req.user
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
)

// get all boards
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find().populate('owner');
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
)

// get board by id
router.get('/:boardId', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        console.log(board, '<--in first show function')
        res.status(200).json(board);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// get all tasks for board
// router.get('/:boardId/tasks', async (req, res) => {
//     try {
//         const board = await Board.findById(req.params.boardId);
//         if (!board) {
//             res.status(404)
//             throw new Error('Board not found.');
//         }
//         console.log(board, '<--in second show function')
//         res.status(200).json(board.tasks);
//     } catch (error) {
//         if (res.statusCode === 404) {
//             res.status(404).json({ error: error.message });
//         } else {
//             res.status(500).json({ error: error.message });
//         }
//     }
// }
// )

// update board
router.put('/:boardId', async (req, res) => {
    try {
        const board = await Board.findByIdAndUpdate(req.params.boardId, req.body, { new: true });
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        res.status(200).json(board);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// delete board
router.delete('/:boardId', async (req, res) => {
    try {
        const board = await Board.findByIdAndDelete(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        res.status(200).json(board);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// create new tasks for board
router.post('/:boardId/tasks', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }

        const task = {
            taskName: req.body.taskName,
            description: req.body.description,
            completeWithin: req.body.completeWithin,
            category: req.body.category,
            status: req.body.status,
            isRequired: req.body.isRequired
        };
        console.log('Request Body:', req.body);
        board.tasks.push(task);
        await board.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error, 'Error creating task');
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)



// view task by id
router.get('/:boardId/tasks/:taskId', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        const task = board.tasks.id(req.params.taskId);
        if (!task) {
            res.status(404)
            throw new Error('Task not found.');
        }
        res.status(200).json(task);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// update task
router.put('/:boardId/tasks/:taskId', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        const task = board.tasks.id(req.params.taskId);
        if (!task) {
            res.status(404)
            throw new Error('Task not found.');
        }
        task.set(req.body);
        await board.save();
        console.log(board, '<--board')
        console.log(task, '<--task')
        res.status(200).json(task);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// delete task
router.delete('/:boardId/tasks/:taskId', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        const task = board.tasks.id(req.params.taskId);
        if (!task) {
            res.status(404)
            throw new Error('Task not found.');
        }
        board.tasks.pull({ _id: req.params.taskId });
        await board.save();
        res.status(200).json(task);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)

// add comment
router.post('/:boardId/tasks/:taskId/comments', async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            res.status(404)
            throw new Error('Board not found.');
        }
        const task = board.tasks.id(req.params.taskId);
        if (!task) {
            res.status(404)
            throw new Error('Task not found.');
        }
        task.comments.push(req.body);
        await board.save();
        res.status(200).json(task);
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}
)


module.exports = router;