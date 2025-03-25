import { useEffect } from 'react'
import { Box, Container, Typography, Paper, TextField, Button } from '@mui/material'

export function Register() {
    useEffect(()=>{
        console.log("rendering register page")
    }, []);

    const handleRegister = () => {
    };

    return (
        <Container>
        <Box display={"flex"} justifyContent={"center"}>

          <Paper
            elevation={10}
            sx={{
              marginTop: 8,
              padding: 2,
              width: "50%"
            }}
          >
          <Typography variant={"h4"} textAlign={"center"} sx={{ mb: 2 }}>
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ mt: 1 }}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography>First Name</Typography>
            <TextField
              placeholder="Enter first name"
              sx={{ mb: 3 }}
            />
            <Typography>Last Name</Typography>
            <TextField
              placeholder="Enter last name"
              sx={{ mb: 3 }}
            />
            <Typography>Email Address</Typography>
            <TextField
              placeholder="Enter email"
              sx={{ mb: 3 }}
            />
            <Typography>Password</Typography>
            <TextField
              placeholder="Enter password"
              type="password"
              sx={{ mb: 3 }}
            />
            <Box display={"flex"} justifyContent={"center"}>
              <Button variant={"contained"}>Submit</Button>
            </Box>
          </Box>
          </Paper>
        </Box>
      </Container>
  )
}


