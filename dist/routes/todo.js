"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
router.post('todo', (req, res) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "update todo", todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res) => {
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoitem => todoitem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: "update todo", todos: todos });
    }
    res.status(400).json({ message: "could not find id for todo" });
});
router.delete('/todo/:todoId', (req, res) => {
    const params = req.params;
    todos = todos.filter(todoitem => todoitem.id !== params.todoId);
    res.status(200).json({ message: "deleted todo", todos: todos });
});
exports.default = router;
