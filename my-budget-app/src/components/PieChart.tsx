import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { Expenses } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    expenses: Expenses
}

export function PieChart({ expenses }: PieChartProps) {

    //chartData holds the labels(categories) and values for the chart
    const [chartData, setChartData] = useState<any>({});

    useEffect(() => {

        // track total amount for each category
        // key is category name and value is the running total
        const categoryTotals: { [key: string]: number } = {};

        expenses.forEach(expense => {

        const category = expense.category;

        // skip expense if there is no category
        if (!category) return;

        //convert amount to a number
        const amount = Number(expense.amount);

        // if the category exists add the amount
        if (categoryTotals[category]) {
            categoryTotals[category] += amount;
        } else {
            // if the category doesn't exist then create category and set the amount
            categoryTotals[category] = amount;
        }
        });

        console.log("categoryTotals: ", categoryTotals)

        // labels = array of category names
        // data = array of values
        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        setChartData({
        labels,
        datasets: [
            {
                data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
        });
    }, [expenses]);

    return (
        <Box sx={{ width: "80%", height:"400px"}}>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Box>
                    <Typography sx={{textAlign: "center"}}>Monthly Expense by Category</Typography>
                    <Pie data={chartData}/>
                </Box>
            ) : (
                <Typography>No data to display</Typography>
            )}
        </Box>
    );
}

