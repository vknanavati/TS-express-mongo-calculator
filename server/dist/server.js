"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const expenseSchema_1 = __importDefault(require("./model/expenseSchema"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const MONGO_URL = process.env.MONGO_URL || "";
const PORT = process.env.PORT || 5000;
const clientOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
    }
};
mongoose_1.default.connect(MONGO_URL, clientOptions)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("Connection error: ", err);
});
app.use(express_1.default.json());
app.get("/api", (req, res) => {
    res.json({ "status": ["API is working"] });
});
app.post("/api/expenses", async (req, res) => {
    const { description, amount, category } = req.body;
    if (!description || !amount || !category) {
        res.status(400).json({ error: "missing categories" });
        return;
    }
    const newExpense = new expenseSchema_1.default({ description, amount, category });
    try {
        await newExpense.save();
        res.status(201).json({ message: "expense added" });
    }
    catch (error) {
        res.status(500).json({ error: "failed to add expense" });
    }
});
app.listen(PORT, () => { console.log(`server started on port ${PORT}`); });
