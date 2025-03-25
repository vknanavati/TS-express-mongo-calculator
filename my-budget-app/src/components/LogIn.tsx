import { useEffect } from 'react'
import { Button, Container, Paper, Typography, Box, TextField } from '@mui/material'

export function LogIn() {

  useEffect(()=>{
    console.log("mounted LogIn component")
  }, []);

  const handleLogIn = () => {

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
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogIn}
          sx={{ mt: 1 }}
          display={"flex"}
          flexDirection={"column"}
        >
          <TextField
            placeholder="Enter username"
            sx={{ mb: 3 }}
          />
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


