import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

//types
import { PrismaClient, Users } from "@prisma/client";

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).json({ messasge: "Hello World" })
})

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany()

        return res.status(201).json(users)
    } catch (err) {
        return res.status(400).json({ error: (err as Error).message })
    }
})

app.post('/user/register', async (req, res) => {
    const newUser: Users = req.body;

    try {
        const result = await prisma.users.create({
            data: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                age: newUser.age,
            }
        })

        return res.status(201).json(result)
    } catch (err) {
        return res.status(400).json({ error: (err as Error).message })
    }
})

app.listen(port, () => [
    console.log('Listening on port',  port),
]).on("error", (err: Error) => {
    console.log('Error', err.message)
});