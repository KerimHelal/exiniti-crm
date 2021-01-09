import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from 'react-s-alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getAllLeads, deleteLead, updateLead, insertLead } from '../methods/leads';
import { getUserRole, logout } from '../methods/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  }));

const StaffDashBoard = (props) => {
    const classes = useStyles();
    const [leads, setLeads] = React.useState([]);
    const [modalOpened, setModalOpened] = React.useState(false);
    const [currentLead, setCurrentLead] = React.useState({});
    const [newLead, setNewLead] = React.useState({
        email: '',
        phone: '',
        name: ''
    });


    React.useEffect(() => {
        if(getUserRole() !== 'staff') {
            logout();
            props.history.push('/');
        }
        getAllLeads().then(response => {
            setLeads(response);
        });
    }, []);
    
    const handleChange = (e) => {
        setNewLead({
            ...newLead,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => { 
        e.preventDefault();
        if(newLead.email !== '' && newLead.phone !== '' && newLead.name !== '') {
            insertLead(newLead.name, newLead.phone, newLead.email)
            .then(response => {
                Alert.success(response);
                setNewLead({
                    email: '',
                    phone: '',
                    name: ''
                });
            },
            (error) => {
                Alert.error(error);
            });
        } else {
            Alert.error("Please fill all of the fields");
        }
    }

    const deleteEntry = id => {
        deleteLead(id).then((response) => {
            Alert.success(response);
        });
    }

    const openUpdateModal = lead => {
        setModalOpened(true);
        setCurrentLead(lead);
    }

    const updateEntry = () => {
        updateLead(currentLead).then((response) => {
            Alert.success(response);
        });
    }

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Staff Dashboard
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        name="name"
                        type="text"
                        value={newLead.name}
                        margin="normal"
                        onChange={handleChange}
                        label="Name"
                    /> &nbsp;&nbsp;
                    <TextField
                        name="email"
                        type="email"
                        value={newLead.email}
                        margin="normal"
                        onChange={handleChange}
                        label="Email"
                    /> &nbsp;&nbsp; 
                    <TextField
                        name="phone"
                        type="phone"
                        value={newLead.phone}
                        margin="normal"
                        onChange={handleChange}
                        label="Password"
                    /> &nbsp;&nbsp;
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Add Lead
                    </Button>
                </form>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leads.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => deleteEntry(row._id)}>Delete</Button> &nbsp;
                                        <Button variant="outlined" onClick={() => openUpdateModal(row)}>Update</Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={modalOpened} onClose={() => setModalOpened(false)} >
                <DialogTitle id="form-dialog-title">Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        type="text"
                        value={currentLead.name}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        name="name"
                        type="text"
                        value={currentLead.email}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        name="name"
                        type="text"
                        value={currentLead.phone}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setModalOpened(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => updateEntry()} color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default StaffDashBoard;