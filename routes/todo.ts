import { Router } from "express";
import {Todo} from '../models/todo'

const router= Router();

let todos: Todo[]=[];

router.get('/', (req, res)=>{
    res.status(200).json({todos: todos})
})

router.post('todo', (req, res)=>{
    const newTodo: Todo= {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo);
    res.status(201).json({message: "update todo", todo: newTodo, todos: todos})
})

router.put('/todo/:todoId', (req, res)=>{
    const tid= req.params.todoId;
    const todoIndex= todos.findIndex(todoitem=> todoitem.id === tid)
    if(todoIndex >= 0){
        todos[todoIndex]={id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({message: "update todo", todos: todos})
    }
    res.status(400).json({message : "could not find id for todo"})
})

router.delete('/todo/:todoId', (req, res)=>{
    todos = todos.filter(todoitem => todoitem.id !== req.params.todoId)
    res.status(200).json({message: "deleted todo", todos: todos})
})

export default router;