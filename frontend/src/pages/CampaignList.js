import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const CampaignList = ({ campaigns }) => {
  const [open, setOpen] = React.useState(false);
  const [editedCampaign, setEditedCampaign] = React.useState({
    type: '',
    startDate: '',
    endDate: '',
    schedule: [
      { day: 'Monday', startTime: '', endTime: '', selected: false },
      { day: 'Tuesday', startTime: '', endTime: '', selected: false },
      { day: 'Wednesday', startTime: '', endTime: '', selected: false },
      { day: 'Thursday', startTime: '', endTime: '', selected: false },
      { day: 'Friday', startTime: '', endTime: '', selected: false },
    ],
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCampaign = (campaign) => {
    setEditedCampaign(campaign);
    handleOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCampaign({ ...editedCampaign, [name]: value });
  };

  const handleCheckboxChange = (day) => {
    const newSchedule = editedCampaign.schedule.map((item) => ({
      ...item,
      selected: day === item.day ? !item.selected : item.selected,
    }));
    setEditedCampaign({ ...editedCampaign, schedule: newSchedule });
  };

  const handleTimeChange = (day, timeType, value) => {
    const newSchedule = editedCampaign.schedule.map((item) => ({
      ...item,
      [timeType]: day === item.day ? value : item[timeType],
    }));
    setEditedCampaign({ ...editedCampaign, schedule: newSchedule });
  };

  const selectedWeekdays = editedCampaign.schedule.map((item) => item.day);

  const handleAddWeekday = (weekday) => {
    const isExistingDay = editedCampaign.schedule.some((item) => item.day === weekday);
    if (!isExistingDay) {
      const newScheduleItem = {
        day: weekday,
        startTime: '',
        endTime: '',
        selected: false,
      };
      setEditedCampaign((prevState) => ({
        ...prevState,
        schedule: [...prevState.schedule, newScheduleItem],
      }));
    }
  };

  const handleSaveChanges = () => {
  
    const { _id, ...updatedCampaign } = editedCampaign;

    axios
      .put(`http://localhost:5000/api/campaigns/${_id}`, updatedCampaign)
      
      .then((response) => {
        console.log('Updated campaign successfully:', response.data);
        handleClose();
      })
      .catch((error) => {
        console.error('Error updating campaign:', error);
      });
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: '16px' }}>
      {campaigns.map((campaign) => (
        <Grid key={campaign._id} item xs={12} sm={6} md={4}>
          <Card
            sx={{
              marginBottom: '16px',
              '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }, 
              maxWidth: 300,
              bgcolor: 'background.paper',
               boxShadow: 24,
               p: 2,
               maxHeight: '41vh',
               overflowY: 'auto',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campaign Details
              </Typography>
              <Typography variant="body1">Type: {campaign.type}</Typography>
              <Typography variant="body1">
                Start Date: {campaign.startDate.split('T')[0]}
              </Typography>
              <Typography variant="body1">
                End Date: {campaign.endDate.split('T')[0]}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: '8px' }}>
                Campaign Schedule
              </Typography>
              <Grid container spacing={1}>
                {campaign.schedule.map((item, index) => (
                  <Grid key={index} item xs={12}>
                    <Typography variant="body2">
                      {item.day}: {item.startTime} - {item.endTime}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => editCampaign(campaign)}
                sx={{ marginTop: '16px', marginRight: '8px' }}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-campaign-modal-title"
        aria-describedby="edit-campaign-modal-description"
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
            p: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '8px',
            }}
          >
            
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography
            id="edit-campaign-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ marginBottom: '16px' }}
          >
            Edit Campaign
          </Typography>
          <Box>

          <IconButton onClick={handleClose} aria-label="close" sx={{ '&:hover': { color: 'primary.main' } }}>
              <CloseIcon />
            </IconButton>
          </Box>

            </Box>
          <form onSubmit={handleSaveChanges}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="edit-campaign-type-label">
                    Campaign Type
                  </InputLabel>
                  <Select
                    labelId="edit-campaign-type-label"
                    name="type"
                    value={editedCampaign.type}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="Cost per Order">Cost per Order</MenuItem>
                    <MenuItem value="Cost per Click">Cost per Click</MenuItem>
                    <MenuItem value="Buy One Get One">
                      Buy One Get One
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="startDate"
                  label="Start Date"
                  value={editedCampaign.startDate}
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
                  value={editedCampaign.endDate}
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
                  
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Monday"
                        checked={selectedWeekdays.includes("Monday")}
                        onChange={() => handleAddWeekday('Monday')}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Tuesday"
                        checked={selectedWeekdays.includes("Tuesday")}
                        onChange={() => handleAddWeekday('Tuesday')}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Wednesday"
                        checked={selectedWeekdays.includes("Wednesday")}
                        onChange={() => handleAddWeekday('Wednesday')}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Thursday"
                        checked={selectedWeekdays.includes("Thursday")}
                        onChange={() => handleAddWeekday('Thursday')}
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Friday"
                        checked={selectedWeekdays.includes("Friday")}
                        onChange={() => handleAddWeekday('Friday')}
                      />
                         <FormControlLabel
                        control={<Checkbox />}
                        label="Saturday"
                        checked={selectedWeekdays.includes("Saturday")}
                        onChange={() => handleAddWeekday('Saturday')}
                      />
                         <FormControlLabel
                        control={<Checkbox />}
                        label="Sunday"
                        checked={selectedWeekdays.includes("Sunday")}
                        onChange={() => handleAddWeekday('Sunday')}
                      />
                    </Grid>
                    {editedCampaign.schedule.map((item, index) => (
                      <React.Fragment key={index}>
                        {[
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                          'Sunday',
                        ].includes(item.day) && (
                          <>
                            <Grid item xs={4}>
                              <Typography variant="body2">
                                {item.day}:
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                type="time"
                                value={item.startTime}
                                onChange={(e) =>
                                  handleTimeChange(
                                    item.day,
                                    'startTime',
                                    e.target.value
                                  )
                                }
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
                                value={item.endTime}
                                onChange={(e) =>
                                  handleTimeChange(
                                    item.day,
                                    'endTime',
                                    e.target.value
                                  )
                                }
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
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Grid>
  );
};

export default CampaignList;



