import mongoose from "mongoose";

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

export default Expense;
