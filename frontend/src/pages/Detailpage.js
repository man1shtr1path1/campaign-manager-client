import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box } from '@mui/material';
function Detailpage() {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
      console.log("campaigns1",campaigns);
    axios.get('http://localhost:5000/api/campaigns/')
      .then(response => {
        console.log("data",response.data);
        setCampaigns(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the campaigns!', error);
      });
  }, []);

  const handleOpenModal = () => {
   
  };
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Campaign Management
        </Typography>
      </Box>    
    </Container>
  );
}

export default Detailpage;
