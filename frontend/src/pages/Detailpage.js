import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box, Modal, Fade, Backdrop } from '@mui/material';
import CampaignList from './CampaignList';
import CampaignForm from '../Forms/CampaignForm';
function Detailpage() {
  const [campaigns, setCampaigns] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editCampaignId, setEditCampaignId] = useState(null);


  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/campaigns/');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  };

  const handleOpenModal = (id = null) => {
    setEditCampaignId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditCampaignId(null);
    setOpenModal(false);
  };

  const handleCampaignUpdated = () => {
    handleCloseModal();
    axios.get('/api/campaigns')
      .then(response => {
        setCampaigns(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the campaigns!', error);
      });
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Campaign Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Create New Campaign
        </Button>
        <CampaignList campaigns={campaigns?campaigns:[]} onEdit={handleOpenModal} />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box p={3} bgcolor="background.paper">
            <CampaignForm
              campaignId={editCampaignId}
              onClose={handleCloseModal}
              fetchCampaigns={fetchCampaigns}
            />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default Detailpage;
