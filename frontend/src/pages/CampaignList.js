import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';

const CampaignList = ({ campaigns }) => {
  return (
    <Grid container spacing={2}>
      {campaigns.map((campaign) => (
        <Grid key={campaign._id} item xs={12} sm={6} md={4}>
          <Card sx={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campaign Details
              </Typography>
              <Typography variant="body1">
                Type: {campaign.type}
              </Typography>
              <Typography variant="body1">
                Start Date: {campaign.startDate}
              </Typography>
              <Typography variant="body1">
                End Date: {campaign.endDate}
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CampaignList;
