import React, { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Box, Typography, IconButton, Paper, List, ListItem, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CalendarPage = () => {
    const { data } = useContext(DataContext);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const appointmentsByDate = data.incidents.reduce((acc, inc) => {
        const date = format(new Date(inc.appointmentDate), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(inc);
        return acc;
    }, {});

    return (
        <Paper sx={{p: 2}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h5">{format(currentMonth, 'MMMM yyyy')}</Typography>
                <IconButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: 'bold', mb: 1 }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Box key={day}>{day}</Box>
                ))}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {days.map(day => (
                    <Box key={day.toString()} sx={{ 
                        border: '1px solid #ddd', 
                        height: 150, 
                        p: 1, 
                        overflowY: 'auto',
                        color: !isSameMonth(day, monthStart) ? 'text.secondary' : 'text.primary',
                        backgroundColor: isSameDay(day, new Date()) ? '#f0f0f0' : 'inherit'
                    }}>
                        <Typography variant="body2">{format(day, 'd')}</Typography>
                        <List dense>
                            {(appointmentsByDate[format(day, 'yyyy-MM-dd')] || []).map(app => (
                                <ListItem key={app.id} sx={{p: 0}}>
                                    <ListItemText 
                                        primary={app.title} 
                                        secondary={format(new Date(app.appointmentDate), 'h:mm a')} 
                                        sx={{
                                            backgroundColor: '#e3f2fd', p: 0.5, borderRadius: 1, mb: 0.5,
                                            '& .MuiListItemText-primary': { fontSize: '0.8rem', fontWeight: 'bold' },
                                            '& .MuiListItemText-secondary': { fontSize: '0.7rem' }
                                        }} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default CalendarPage; 