import express from 'express';
import { Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Expense from './model/expenseSchema';

dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO_URL || "";
const PORT = process.env.PORT || 5000;

const clientOptions = {
    serverApi: {
        version: "1" as "1",
        strict: true,
        deprecationErrors: true
    }
};

mongoose.connect(MONGO_URL, clientOptions)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err: Error) =>
        {console.log("Connection error: ", err)
    });


app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
    res.json({ "status": ["API is working"] })
})

app.post("/api/expenses", async(req: Request, res: Response) => {
    const { description, amount, category} = req.body;

    if (!description || !amount || !category) {
        res.status(400).json({error: "missing categories"});
        return
    }

    const newExpense = new Expense({ description, amount, category });
    try {
        await newExpense.save();
        res.status(201).json({ message: "expense added" });
    } catch (error) {
        res.status(500).json({ error: "failed to add expense" })
    }
});

app.listen(PORT, ()=> {console.log(`server started on port ${PORT}`)})