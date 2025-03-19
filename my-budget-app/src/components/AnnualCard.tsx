import { Box, Typography, Divider } from '@mui/material';
import { Expenses, Total  } from '../types';

interface AnnualCardProps {
  expenses: Expenses
  total: Total
}

export function AnnualCard({ expenses, total }: AnnualCardProps) {

  return (

    <Box
      sx={{
        border: '1px solid ',
        padding: 3,
        width: 500,
        mt: 5,
      }}
    >
       <Box display={"flex"} justifyContent={"space-around"} gap={5}>
            <Typography variant="h5" mb={2}>Annual Costs</Typography>
        </Box>

        <Box>
          {expenses.map((expense, index)=> (
            <Box key={index} display={"flex"} justifyContent={"space-between"} mb={2}>
              <Typography>{expense.description}</Typography>
              <Typography>${(Number(expense.amount) * 12).toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>

        <Box mt={1}>
          <Divider/>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} mt={2}>
          <Typography sx={{ fontSize: 21, fontWeight: "bold"}}>Total</Typography>
          <Typography sx={{ fontSize: 21, fontWeight: "bold"}}>${(Number(total)*12).toFixed(2)}</Typography>
        </Box>

    </Box>
  )
}
