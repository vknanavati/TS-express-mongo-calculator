import { FormControl, Select, MenuItem, Dialog, DialogContent, DialogTitle, TextField, Box, Button, DialogActions, SelectChangeEvent, InputLabel } from "@mui/material";
import { Expenses, HandleSetCategory, categories, FormSubmitted, ExpenseDescriptionError, ExpenseAmountError, HandleExpenseDescriptionChange, HandleExpenseAmountChange, IsEdit, DialogOpenState, HandleCloseExpense, SetExpenseDescription, SetExpenseAmount, HandleSaveExpense, selectedCategory } from "../types";

interface AddExpenseFormProps {
    open: DialogOpenState
    onCloseExpense: HandleCloseExpense
    setExpenseDescription: SetExpenseDescription
    setExpenseAmount: SetExpenseAmount
    onSaveExpense: HandleSaveExpense
    isEdit: IsEdit
    expenseDescription: string
    expenseAmount: string
    handleExpenseAmountChange: HandleExpenseAmountChange
    handleExpenseDescriptionChange: HandleExpenseDescriptionChange
    expenseAmountError: ExpenseAmountError
    expenseDescriptionError: ExpenseDescriptionError
    formSubmitted: FormSubmitted
    categories: typeof categories
    handleSetCategory: HandleSetCategory
    expenses: Expenses
    selectedCategory: selectedCategory
}

export function AddExpenseForm({ selectedCategory, handleSetCategory, categories, formSubmitted, expenseAmountError, expenseDescriptionError, handleExpenseDescriptionChange, handleExpenseAmountChange, isEdit, open, onCloseExpense, expenseDescription, expenseAmount, onSaveExpense }: AddExpenseFormProps) {
  return (
      <Dialog open={open} onClose={onCloseExpense}>
        <DialogTitle>{isEdit !== null ? "Edit Expense" : "Add Expense"}</DialogTitle>

        <form onSubmit={onSaveExpense}>
            <DialogContent>
                <Box display={"flex"} gap={6}>
                    <TextField
                        label={isEdit !==null ? expenseDescription : "Item"}
                        variant="standard"
                        value={expenseDescription}
                        error={!!expenseDescriptionError && formSubmitted}
                        helperText={formSubmitted && expenseDescriptionError ? expenseDescriptionError: ""}
                        onChange={handleExpenseDescriptionChange}
                        // onChange={(e) => setExpenseDescription(e.target.value)}
                    />
                    <TextField
                        label={isEdit !==null ? expenseAmount : "Amount"}
                        variant="standard"
                        value={expenseAmount}
                        // !! converts expenseAmountError into a boolean
                        // error prop expects a boolean value
                        // if expenseAmountError contains error message it is true
                        // error = {true} only when error message exists
                        // && formSubmitted so error only shows after form is submitted
                        error={!!expenseAmountError && formSubmitted}
                        // error message only appears if formSubmitted true and expenseAmountError exists
                        // ? expenseAmountError : "" - helper text empty string if expenseAmountError doesn't exist
                        helperText={formSubmitted && expenseAmountError ? expenseAmountError : ""}
                        onChange={handleExpenseAmountChange}
                    />

                        <FormControl sx={{ width: 150 }} size="small">
                        <InputLabel>Categories</InputLabel>
                        <Select
                            label="Categories"
                            value={selectedCategory}
                            onChange={(e: SelectChangeEvent<string>) =>
                                handleSetCategory(e.target.value)
                            }
                        >
                            {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Box>
            </DialogContent>

            <DialogActions>
                    <Button type="submit">Add</Button>
                    <Button onClick={onCloseExpense}>Cancel</Button>
            </DialogActions>
        </form>
    </Dialog>
  )
}
