import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { BudgetCard } from './components/BudgetCard';
import { AddExpenseForm } from './components/AddExpenseForm';
import { AnnualCard } from './components/AnnualCard';
import { PieChart } from './components/PieChart';
import { HandleExpenseDescriptionChange, HandleExpenseAmountChange, categories, IsEdit, HandleSetCategory, HandleEditExpense, HandleDeleteExpense, HandleAddExpense, HandleCloseExpense, HandleSaveExpense, Expense } from './types';

function App() {

  //expenseDescription = item name entered by user
  const [expenseDescription, setExpenseDescription] = useState("")
  //expenseAmount = dollar amount entered by user
  const [expenseAmount, setExpenseAmount] = useState("")

  //array of objects containing expenseDescription and expenseAmount
  //key are 'description' and 'amount'
  const [expenses, setExpenses] = useState<Expense[]>([])

  const [total, setTotal] = useState("")

  const [expenseAmountError, setExpenseAmountError] = useState("")

  const [expenseDescriptionError, setExpenseDescriptionError] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("")

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [isEdit, setIsEdit] = useState<IsEdit>(null)

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  useEffect(()=>{
    //fetch user data (expenses) from backend when component mounts
    fetch("/api/expenses")
    .then(response => response.json())
    .then(data => {
      console.log("fetched data from the backend: ", data);
      setExpenses(data);
    })
    .catch(error => console.error("error fetching from the backend: ", error))
  }, [])

  useEffect(()=>{
    console.log("updated expenseDescription: ", expenseDescription);
    console.log("updated expenseAmount: ", expenseAmount)
    console.log("updated selectedCategory: ", selectedCategory)
    console.log("updated expenses: ", expenses)
  }, [expenseDescription, expenseAmount, selectedCategory, expenses]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = expenses.reduce((sum, expense) => {
        return sum + Number(expense.amount);
      }, 0);

      setTotal(totalAmount.toString())
    };
    calculateTotal();
  }, [expenses]);

  const handleAddExpense: HandleAddExpense = () => {
    setIsOpenDialog(true);
  };

  const handleCloseExpense: HandleCloseExpense = () => {
    setIsEdit(null);
    setExpenseAmountError("");
    setExpenseDescriptionError("");
    setExpenseAmount("");
    setExpenseDescription("");
    setSelectedCategory("");
    setIsOpenDialog(false);
  };

  const handleExpenseAmountChange: HandleExpenseAmountChange = (e) => {

    const userInput = e.target.value;

    if (/^\d*\.?\d{0,2}$/.test(userInput) || userInput === "") {
      setExpenseAmount(userInput);
    }
  };

  const handleExpenseDescriptionChange: HandleExpenseDescriptionChange = (e) => {

    const userInput = e.target.value;

    console.log("userInput expenseDescription: ", userInput)

    if (/^[A-Z][a-z ]*(?:\s[A-Z][a-z ]*)*$/.test(userInput) || userInput === "") {
      setExpenseDescription(userInput);
    }
  };

  const handleSetCategory: HandleSetCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory)
  };

  const handleSaveExpense: HandleSaveExpense = (e) => {

    console.log("Form Submitted")

    e.preventDefault();

    setFormSubmitted(true);

    let valid = true;

    // requires at least one digit or decimal format in order to submit
    if (!/^(?:\d+|\.\d{1,2}|\d+\.\d{1,2})$/.test(expenseAmount)) {
      setExpenseAmountError("Please enter valid amount");
      valid = false;
    } else {
      setExpenseAmountError("")
    };

    if (!/^[A-Z][a-z ]*(?:\s[A-Z][a-z ]*)*$/.test(expenseDescription)) {
      setExpenseDescriptionError("Please enter valid description");
      valid = false;
    } else {
      setExpenseDescriptionError("")
    };

    if (!valid) return;

    const newExpense = {
      description: expenseDescription,
      amount: expenseAmount,
      category: selectedCategory
    };

    //edit expense if isEdit not null aka true update exisiting expense
    if (isEdit !== null) {
      setExpenses((prevExpenses)=> {
         //map will go through each entry until it finds the index === isEdit
        return prevExpenses.map((expense, index) => {
          //if index equals isEdit then update that object
          if (index === isEdit) {
            return { ...expense, ...newExpense }; //merge old info with new
          } else {
            return expense;
          }
        });
      });

      setIsEdit(null); //reset edit state

    } else {
      // else if isEdit null, add new expense
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { ...newExpense } //add new expense to array
      ]);

      // send new expense to backend

      fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense)
      })
      .then(response => response.json())
      .then(data => {
        console.log("expense added: ", data)
      })
      .catch(error => {
        console.error("expense adding error: ", error)
      })
    };

    setExpenseAmount("");
    setExpenseDescription("");
    setExpenseAmountError("");
    setSelectedCategory("");
    setFormSubmitted(false);
    setIsOpenDialog(false);
  };

  const handleEditExpense: HandleEditExpense = (index) => {
    //need the index to select the expense to edit
    //expense is located in an object in an array
    //selectedEdit is set to object the user wants to edit
    //selectedEdit variable needed to access description key and amount key in array of expenses object

    //selectedEdit = {description: 'car insurance', amount: '125', category: 'Transportation'}
    const selectedEdit = expenses[index];

    setExpenseDescription(selectedEdit.description);
    setExpenseAmount(selectedEdit.amount);
    setSelectedCategory(selectedEdit.category || "")

    setIsEdit(index);
    setIsOpenDialog(true);

    console.log("selected entry to edit and index: ", selectedEdit, index);
  }

  const handleDeleteExpense: HandleDeleteExpense = (description) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense)=>
        expense.description !== description))

    console.log(`Deleting an expense entry: description sent to function- ${description}`);
  }

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <Box sx={{ display: "flex"}}>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <BudgetCard
            item={expenseDescription}
            amount={expenseAmount}
            onAddExpense={handleAddExpense}
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditExpense}
            total={total}
          />
          <AnnualCard
            expenses={expenses}
            total={total}
          />
        </Box>

        <Box sx={{flex: 3, display: "flex", justifyContent: "flex-end"}}>
          <PieChart
              expenses={expenses}
            />
        </Box>

      </Box>

      <AddExpenseForm
        expenseDescription={expenseDescription}
        expenseAmount={expenseAmount}
        open={isOpenDialog}
        onCloseExpense={handleCloseExpense}
        setExpenseDescription={setExpenseDescription}
        setExpenseAmount={setExpenseAmount}
        onSaveExpense={handleSaveExpense}
        isEdit={isEdit}
        handleExpenseAmountChange={handleExpenseAmountChange}
        handleExpenseDescriptionChange={handleExpenseDescriptionChange}
        expenseAmountError={expenseAmountError}
        expenseDescriptionError={expenseDescriptionError}
        formSubmitted={formSubmitted}
        categories={categories}
        handleSetCategory={handleSetCategory}
        expenses={expenses}
        selectedCategory={selectedCategory}

      />
   </Container>
  );
}

export default App;
