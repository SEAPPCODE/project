import React, { useEffect, useState } from 'react'
import { Box,
    IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Snackbar,
    Alert,
    Card}
    from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

export default function Tasks() {
    const [categories, setCategories] = useState([])
    const [allSubCategories, setAllSubCategories] = useState([])
    const [filteredSubCategories, setFilteredSubCategories] = useState([])

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [filterText, setFilterText] = useState("")

    const [page, setPage] = useState(0);  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [tasks, setTasks] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [newTask, setNewTask] = useState({
        title: '',
        summary: '',
        content: '',
        categoryid: '',
        subcategoryid: '',
        created_at: new Date().toISOString()  // Set current datetime
    })

    const [editTask, setEditTask] = useState({
        title: '',
        summary: '',
        content: '',
        created_at: new Date().toISOString()  // Set current datetime
    })

    const handleClickOpenEdit = (task) => {
        setEditTask(task)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value});
    }

    const handleChangeEdit = (e) => {
        setEditTask({...editTask, [e.target.name]: e.target.value})
    }

    const handleConfirmOpen = (id) => {
        setDeleteId(id)
        setConfirmOpen(true)
    }
    const handleConfirmClose = (id) => {
        setDeleteId(null)
        setConfirmOpen(false)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleDelete = async (id)  => {
        setSnackbarOpen(true)
        try {
            await axiosInstance.delete(`http://localhost:8080/task/${id}`);
            setTasks(tasks.filter(task => task.id !== id));

            setSnackbarMessage("Task was deleted successfully!")
            setSnackbarSeverity("success")

            handleConfirmClose()
        } catch (error) {
            console.log('Error occured deleting the task: ', error);
            setSnackbarMessage("An error occured trying to delete a task.")
            setSnackbarSeverity("warning")
        }
    };

    const handleEditTask = async () => {
        setSnackbarOpen(true)
        try {
            const response = await axiosInstance.put(`http://localhost:8080/task/${editTask.id}`, {
                ...editTask,
                updatedAt: new Date().toISOString(),  // Set current datetime
            });
            setTasks(tasks.map(task =>
                task.id === editTask.id ? response.data : task
            ));
            setSnackbarMessage("Task was updated successfully!")
            setSnackbarSeverity("success")
            handleCloseEdit();
        } catch (error) {
            setSnackbarMessage("There was an error updating the task! Please try again")
            setSnackbarSeverity("warning")
            console.log('Error occured updating the task', error)
        }
    }

    const handleAddTask = async () => {
        setSnackbarOpen(true)
        try {
            const response = await axiosInstance.post('http://localhost:8080/tasks', {
                ...newTask,
                createdAt: new Date().toISOString(),  // Set current datetime
            });
            setTasks([...tasks, response.data])
            setNewTask({
                title: '',
                summary: '',
                content: '',
                createdAt: new Date().toISOString()
            });
            setSnackbarMessage("Task was added successfully!")
            setSnackbarSeverity("success")
            handleClose();
        }catch(error){
            setSnackbarMessage("There was an error adding a task! Please try again")
            setSnackbarSeverity("warning")
            console.log('There was an error adding the task!', error)
        }
    }

    const handleFilterChange = (event) => {
        setFilterText(event.target.value)
        setPage(0)
    }

    const filteredTasks  = tasks.filter( task =>
        (task.title && task.title.toLowerCase().includes(filterText.toLocaleLowerCase())) ||
        (task.summary && task.summary.toLowerCase().includes(filterText.toLocaleLowerCase()))
    );

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/tasks').then(response => {
            setTasks(response.data)
        }).catch((error) => {
            console.log("There was an error fetching the tasks", error)
        })
    }, []);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/categories').then(response => {
            setCategories(response.data)
        }).catch((error) => {
            console.log("There was an error fetching the categories", error)
        })
    }, []);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/subCategories').then(response => {
            setAllSubCategories(response.data)
        }).catch((error) => {
            console.log("There was an error fetching the suCategories", error)
        })
    }, []);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset the table to the first page whenever rows per page changes
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value
        setNewTask({
            ...newTask,
            categoryid: selectedCategoryId,
            subcategoryid: ''
        });

        const filteredSubCategories = allSubCategories.filter(
            (subCategory) => subCategory.categoryid === Number(selectedCategoryId)
        );
        setFilteredSubCategories(filteredSubCategories)
    }

    const handleSubCategoryChange = (event) => {
        const selectedSubCategoryId = event.target.value
        setNewTask({
            ...newTask,
            subcategoryid: selectedSubCategoryId
        })
    }


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20%"
            padding="2rem"
            border="ActiveBorder"
            fullWidth
        >
            <Card sx={{ width: '80%', padding: '2rem', border: '2px solid black', borderRadius: '8px' }}>
                <TableContainer>
                    <Box display="flex" justifyContent="flex-start">
                        <Button variant='contained' onClick={handleClickOpen}> Add New</Button>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" >
                        <TextField
                            label="Search Tasks"
                            variant="outlined"
                            value={filterText}
                            onChange={handleFilterChange}
                        >

                        </TextField>
                    </Box>
                    <hr></hr>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} scope="col">#</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} scope="col">Task Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} scope="col">Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} scope='col'>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} scope="col">Date Added</TableCell>
                                <TableCell scope="col"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { filteredTasks !== null? filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                                <TableRow
                                    key={task.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ fontSize: '1.1rem' }} scope="row">{page * rowsPerPage + index + 1}</TableCell>

                                    <TableCell sx={{ fontSize: '1.1rem' }}><Link to={`/task`} state={{currentTask: task}} >{task.title}</Link></TableCell>

                                    <TableCell sx={{ fontSize: '1.1rem' }}>{task.summary}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }}>{task.category? task.category.title:''}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }}>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton color='secondary' onClick={() => handleConfirmOpen(task.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton color='secondary' onClick={() => handleClickOpenEdit(task)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) ): (<TableRow><TableCell>Loading... </TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                    <TablePagination  sx={{ fontSize: '1.1rem' }}
                                      component="div"
                                      count={tasks!= null? tasks.length: 0}
                                      page={page}
                                      onPageChange={handleChangePage}
                                      rowsPerPage={rowsPerPage}
                                      onRowsPerPageChange={handleChangeRowsPerPage}
                                      rowsPerPageOptions={[5, 10, 25]}  // Options for rows per page
                    />
                </TableContainer>
                <hr></hr>
            </Card>
            {/* Confirmation Dialog for Deletion */}
            <Dialog open={confirmOpen}
                    style={{ width: '600px', maxWidth: '600px' }} // Custom width
                    onClose={handleConfirmClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this task?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete(deleteId);
                        }}
                        color="secondary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Dialog for Adding New Task */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <select
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '15px',
                            fontSize: '16px'
                        }}
                        id="categoryid"
                        onChange={handleCategoryChange}
                        value={newTask.categoryid}
                    >
                        <option>Choose...</option>
                        {categories.filter(c => c.title != null).map(category => (
                            <option key={category.id} value={category.id} >
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <select
                        id="subcategoryid"
                        onChange={handleSubCategoryChange}
                        value={newTask.subcategoryid}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '15px',
                            fontSize: '16px'
                        }}
                    >
                        <option>Choose...</option>
                        {filteredSubCategories.map(subCategory => (
                            <option
                                key={subCategory.id}
                                value={subCategory.id}
                            >
                                {subCategory.description}
                            </option>
                        ))}
                    </select>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Task Title"
                        type="text"
                        fullWidth
                        value={newTask.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="summary"
                        label="Summary"
                        type="text"
                        fullWidth
                        value={newTask.sumary}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        fullWidth
                        value={newTask.content}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary" variant="contained">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Dialog for Editing Task */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Task Title"
                        type="text"
                        fullWidth
                        value={editTask.title}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="summary"
                        label="Summary"
                        type="text"
                        fullWidth
                        value={editTask.summary}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        fullWidth
                        value={editTask.content}
                        onChange={handleChangeEdit}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained"  onClick={handleEditTask} >
                        Update Task
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '80px'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}

