"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb://localhost:27017/budgetDB")
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("Connection error: ", err);
});
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne"] });
});
app.listen(5000, () => { console.log("server started on port 5000"); });
