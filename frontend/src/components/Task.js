import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Divider,
    Grid,
    CardHeader
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
    if (!task) {
        return (
            <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
                <CardHeader>
                    Task Details
                </CardHeader>
                <CardContent>
                    <Typography variant="h5" color="text.secondary" align="center">
                        Task details are not available.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card sx={{ maxWidth: 900, margin: '30px auto', border: '3px solid #ccc' }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {task.title} - {task.subCategory.description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Category: {task.category.title} ({task.category.metaTitle})
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{fontWeight:'bold'}} variant="subtitle1" gutterBottom>
                    Summary:
                </Typography>
                <Typography variant="body1">
                    {task.summary}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{fontWeight:'bold'}} variant="subtitle1" gutterBottom>
                    Content:
                </Typography>
                <Typography variant="body1">
                    {task.content}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Created At: {new Date(task.createdAt).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Updated At: {new Date(task.updatedAt).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Link to="/tasks" size="small" color="primary">
                    Back to List
                </Link>
            </CardActions>
        </Card>
    );
};

const Task = () => {

    const location = useLocation()
    const [task, setTask] = useState(null)

    useEffect(() => {
        setTask(location.state.currentTask)
    }, [location.state.currentTask])

    return <TaskCard task={task} />;
};

export default Task;