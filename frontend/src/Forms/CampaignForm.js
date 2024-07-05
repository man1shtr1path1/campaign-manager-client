import React, { useState } from 'react';
import axios from 'axios';
import {Button,Modal,Box,TextField,Select,MenuItem,InputLabel,FormControl,Typography,Checkbox,FormControlLabel,FormGroup,Grid,IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const CampaignFormModal = ({ onClose ,fetchCampaigns}) => {
  const [open, setOpen] = useState(true);
  const [campaign, setCampaign] = useState({
    type: 'Cost per Order',
    startDate: '',
    endDate: '',
    schedule: [],
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const handleCheckboxChange = (day) => {
    const currentIndex = selectedDays.indexOf(day);
    const newSelectedDays = [...selectedDays];
    if (currentIndex === -1) {
      newSelectedDays.push(day);
    } else {
      newSelectedDays.splice(currentIndex, 1);
    }

    setSelectedDays(newSelectedDays);
  };

  const handleTimeChange = (day, timeType, value) => {
    const newSchedule = [...campaign.schedule];
    const dayIndex = newSchedule.findIndex((item) => item.day === day);
    if (dayIndex !== -1) {
      newSchedule[dayIndex][timeType] = value;
    } else {
      newSchedule.push({ day, startTime: '', endTime: '' });
      newSchedule[newSchedule.length - 1][timeType] = value;
    }
    setCampaign({ ...campaign, schedule: newSchedule });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedCampaign = {
      ...campaign,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      schedule: campaign.schedule.map((item) => ({
        day: item.day,
        startTime: item.startTime,
        endTime: item.endTime,
      })),
    };
    axios
      .post('http://localhost:5000/api/campaigns/', formattedCampaign)
      .then(() => {
        handleClose();
        fetchCampaigns();
      })
      .catch((error) => {
        console.error('There was an error creating the campaign!', error);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="campaign-modal-title"
      aria-describedby="campaign-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container justifyContent="flex-end">
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography
          id="campaign-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ marginBottom: '16px' }}
        >
          Add Campaign
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="campaign-type-label">Campaign Type</InputLabel>
                <Select
                  labelId="campaign-type-label"
                  label="Campaign Type"
                  name="type"
                  value={campaign.type}
                  onChange={handleChange}
                >
                  <MenuItem value="Cost per Order">Cost per Order</MenuItem>
                  <MenuItem value="Cost per Click">Cost per Click</MenuItem>
                  <MenuItem value="Buy One Get One">Buy One Get One</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                label="Start Date"
                value={campaign.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                label="End Date"
                value={campaign.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
                  Campaign Schedule
                </Typography>
                <FormGroup row>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <FormControlLabel
                      key={day}
                      control={<Checkbox checked={selectedDays.includes(day)} onChange={() => handleCheckboxChange(day)} />}
                      label={<Typography variant="body2">{day}</Typography>}
                      sx={{ marginRight: '16px' }}
                    />
                  ))}
                </FormGroup>
                {selectedDays.map((day) => (
                  <Grid key={day} container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant="body2">{day}:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="time"
                        value={campaign.schedule.find((item) => item.day === day)?.startTime || ''}
                        onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="time"
                        value={campaign.schedule.find((item) => item.day === day)?.endTime || ''}
                        onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                ))}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Campaign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CampaignFormModal;
