import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const KpiCard = ({ title, value, icon, color = 'primary' }) => {
  // Support both string and object color
  const mainColor = typeof color === 'object' ? color.main : `${color}.main`;
  const lightColor = typeof color === 'object' ? color.light : `${color}.light`;

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${typeof color === 'object' ? color.light : '#e3e8f0'} 60%, #fff 100%)`,
        boxShadow: '0 4px 24px 0 rgba(37, 99, 235, 0.08)',
        borderRadius: 3,
        minHeight: { xs: 80, sm: 120 },
        p: 0,
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.025)',
          boxShadow: '0 8px 32px 0 rgba(37, 99, 235, 0.13)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          p: { xs: 1.2, sm: 2 },
          '&:last-child': { pb: { xs: 1.2, sm: 2 } },
        }}
      >
        <Box>
          <Typography
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: { xs: 13, sm: 15 },
              mb: 0.5,
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 22, sm: 28 },
              color: mainColor,
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            ml: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${lightColor} 60%, #fff 100%)`,
            borderRadius: '50%',
            width: { xs: 40, sm: 56 },
            height: { xs: 40, sm: 56 },
            boxShadow: '0 2px 8px 0 rgba(37, 99, 235, 0.10)',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'transparent',
              color: mainColor,
              width: { xs: 28, sm: 36 },
              height: { xs: 28, sm: 36 },
              fontSize: { xs: 20, sm: 28 },
              boxShadow: 'none',
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KpiCard; 