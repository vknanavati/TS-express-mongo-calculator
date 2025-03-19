import { Box, Typography, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import { Total, HandleEditExpense, HandleDeleteExpense, Expenses, HandleAddExpense, ExpenseDescription, ExpenseAmount } from '../types';

interface BudgetCardProps {
    item: ExpenseDescription
    amount: ExpenseAmount
    onAddExpense: HandleAddExpense
    expenses: Expenses
    onDeleteExpense: HandleDeleteExpense
    onEditExpense: HandleEditExpense
    total: Total
}
export function BudgetCard({ total, expenses, onAddExpense, onDeleteExpense, onEditExpense }: BudgetCardProps) {

  return (
    <Box
        sx={{
            border: '1px solid',
            padding: 3,
            width: 500,
            mt: 5
        }}
    >
      <Box display={"flex"} justifyContent={"space-around"} gap={5}>
          <Typography variant="h5">Cost of Living</Typography>
      </Box>

        <Box sx={{ display: "flex", mb: 2, mt: 3 }}>
              {/* flex:2 allows for the Expense Name to take up twice as much space
              as the Cost. Cost is a narrower column
              */}
          <Box sx={{ flex: "2", pr: 2 }}>
            <Typography sx={{ fontSize: 21, fontWeight: "bold" }}>Expense Name</Typography>
          </Box>
          <Box sx={{ flex: "1", pr: 2 }}>
            <Typography sx={{ fontSize: 21, fontWeight: "bold" }}>Cost</Typography>
          </Box>
          <Box sx={{ width: 80 }} /> {/* Space for edit/delete buttons */}
        </Box>

          {expenses.map((expense, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <Box sx={{ flex: "2", pr: 2 }}>
                <Typography sx={{ fontSize: 19, wordBreak: "break-word" }}>{expense.description}</Typography>
              </Box>
              <Box sx={{ flex: "1", pr: 2 }}>
                <Typography sx={{ fontSize: 19 }}>${expense.amount}</Typography>
              </Box>
              <Box sx={{ width: 80, display: "flex", justifyContent: "flex-end" }}>
                <IconButton>
                  <EditIcon onClick={()=>onEditExpense(index)}/>
                </IconButton>
                <IconButton onClick={()=>onDeleteExpense(expense.description)}>
                  <DeleteIcon/>
                </IconButton>
              </Box>
            </Box>
          ))}
      <Box>
        <Divider/>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", mt: 2 }}
      >
        <Box sx={{ flex: "2", pr: 2 }}>
          <Typography sx={{fontSize: 21, fontWeight: "bold"}}>Total</Typography>
        </Box>
        <Box sx={{ flex: "1", pr: 2 }}>
          <Typography sx={{ fontSize: 21 }}>${total}</Typography>
        </Box>
        <Box sx={{ width: 80 }} />
      </Box>
      <Box display={"flex"} justifyContent={"right"} mt={2}>
          <Button
              variant="contained"
              onClick={onAddExpense}
          >
              Add Expense
          </Button>
      </Box>
    </Box>
  )
}