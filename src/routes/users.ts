import { Router } from 'express';

const router = Router();

// TODO: Student implementation - Part 1: User Routes
// GET /users
// GET /users/:id
// POST /users
interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] =[];
let nextId =1;

router.get('/users', (_req, res) => {
    res.status(200).json(users);
});

router.get('/users/:id',(req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if(!user){
        return res.status(404).json({ error: 'User Not Found'});
    }
    res.status(200).json(user);
});

router.post('/users', (req, res) => {
    const {name, email} = req.body ?? {};

    if(typeof name !== 'string' || typeof email !== 'string' || !name.trim() || !email.trim()) {
        return res.status(400), res.json({ error: 'Both "name" and "email" are required and must be strings' });
    }
    const user: User = { id: nextId++, name: name.trim(), email: email.trim()};
    users.push(user);
    res.status(201).json(user);
});

export default router;
