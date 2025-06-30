import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const KpiCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </CardContent>
    </Card>
  );
};

export default KpiCard; 