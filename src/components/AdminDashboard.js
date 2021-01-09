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
import { register, logout, getUserRole, getCurrentUser } from '../methods/auth';
import { getAllUsers, deleteUser, updateUser } from '../methods/users';

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

const AdminDashboard = (props) => {
    const classes = useStyles();
    const [users, setUsers] = React.useState([]);
    const [modalOpened, setModalOpened] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [newUser, setNewUser] = React.useState({
        email: '',
        password: '',
        name: ''
    });


    React.useEffect(() => {
        if(!getCurrentUser() || getUserRole() !== 'superAdmin') {
            logout();
            props.history.push('/');
        }
        getAllUsers().then(response => {
            setUsers(response);
        });
    }, []);
    
    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => { 
        e.preventDefault();
        if(newUser.email !== '' && newUser.password !== '' && newUser.name !== '') {
            register(newUser.email, newUser.password, newUser.name)
            .then(response => {
                Alert.success(response);
                setNewUser({
                    email: '',
                    password: '',
                    name: ''
                });
                getAllUsers().then(response => {
                    setUsers(response);
                });
            },
            (error) => {
                const errorMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              Alert.error(errorMessage);
            });
        } else {
            Alert.error("Please fill all of the fields");
        }
    }

    const deleteEntry = id => {
        deleteUser(id).then((response) => {
            Alert.success(response);
        });
    }

    const openUpdateModal = user => {
        setModalOpened(true);
        setCurrentUser(user);
    }

    const updateEntry = () => {
        updateUser(currentUser).then((response) => {
            Alert.success(response);
        });
    }

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Admin Dashboard
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        name="name"
                        type="text"
                        value={newUser.name}
                        margin="normal"
                        onChange={handleChange}
                        label="Name"
                    /> &nbsp;&nbsp;
                    <TextField
                        name="email"
                        type="email"
                        value={newUser.email}
                        margin="normal"
                        onChange={handleChange}
                        label="Email"
                    /> &nbsp;&nbsp; 
                    <TextField
                        name="password"
                        type="password"
                        value={newUser.password}
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
                        Register
                    </Button>
                </form>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
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
            <Button onClick={() => { logout(); props.history.push('/') }}>Logout</Button>
            <Dialog open={modalOpened} onClose={() => setModalOpened(false)} >
                <DialogTitle id="form-dialog-title">Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        type="text"
                        value={currentUser.name}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        name="name"
                        type="text"
                        value={currentUser.email}
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

export default AdminDashboard;