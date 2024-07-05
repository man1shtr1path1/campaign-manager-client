import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box } from '@mui/material';
import CampaignList from './CampaignList.js';
function Detailpage() {
  const [campaigns, setCampaigns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editCampaignId, setEditCampaignId] = useState(null);
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

  const handleOpenModal = (id = null) => {
    setEditCampaignId(id);
    setOpenModal(true);
  };


  

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Campaign Management
        </Typography>
        <CampaignList campaigns={campaigns?campaigns:[]}/>
      </Box>
    </Container>
  );
}

export default Detailpage;
