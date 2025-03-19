import express from 'express';
import { Request, Response} from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect("mongodb://localhost:27017/budgetDB")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err: Error) => {console.log("Connection error: ", err)
    });

interface ExpenseObject {
    description: string;
    amount: string;
    category: string;
}

const expenseSchema = new mongoose.Schema<ExpenseObject>({
    description: { type: String, required: true },
    amount: { type: String, required: true },
    category: { type: String, required: true }
});

const Expense = mongoose.model<ExpenseObject>("Expense", expenseSchema);

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

app.listen(5000, ()=> {console.log("server started on port 5000")})