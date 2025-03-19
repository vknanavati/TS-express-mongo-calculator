import { TextField, Button, Box, Typography } from '@mui/material';
import {HandleSubmitBudget, SetInputAmount, SetInputName, InputAmount, InputName } from '../types';

interface CreateBudgetProps {
    handleSubmitBudget: HandleSubmitBudget
    setInputAmount: SetInputAmount
    setInputName: SetInputName
    inputAmount: InputAmount
    inputName: InputName
}

export function CreateBudget({handleSubmitBudget, setInputAmount, setInputName, inputAmount, inputName}: CreateBudgetProps) {

    return (
        <form onSubmit={(e)=>handleSubmitBudget(e)}>
            <Box
                sx={{
                    border: '1px solid',
                    padding: 3,
                    width: 500
                }}
            >
                <Typography variant='h5' textAlign={'center'}
                >
                    Add Budget
                </Typography>

                <Box display={'flex'} justifyContent={'center'} gap={2} mt={2}>

                    <TextField
                        label='Budget Name'
                        variant='outlined'
                        value={inputName}
                        onChange={(e)=>setInputName(e.target.value)}
                    />

                    <TextField
                        label='Amount'
                        variant='outlined'
                        value={inputAmount}
                        onChange={(e)=>setInputAmount(e.target.value)}
                    />
                </Box>

                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Add Budget
                    </Button>
                </Box>
            </Box>
        </form>
    )
}