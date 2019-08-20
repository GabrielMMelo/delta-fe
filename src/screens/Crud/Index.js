import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import api from '../../services/api';

import './styles.css';

class Crud extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        students: [],
        newStudent: {
            name: '',
            address: '',
            picture: ''
        }
    }

    componentDidMount() {
        this.loadStudents();
    }

    loadStudents = async () => {
        const response = await api.get('/students');
        this.setState({students: response.data});
    }

    deleteStudent = async (id) => {
        const response = await api.delete('/students/' + id);
        // renderiza ao deletar
        this.setState({students: this.state.students.filter(function(value, index, arr){
                return value.id !== id;
            })
        });
        this.forceUpdate();
    }

    handleChange(event) {
        let studentAux = this.state.newStudent;
        if (event.target.name === "name")
            studentAux.name = event.target.value;
        else if (event.target.name === "address")
            studentAux.address = event.target.value;
        else if (event.target.name === "picture"){
            let files = event.target.files;
            Resizer.imageFileResizer(
                event.target.files[0],
                100,
                100,
                'JPG',
                100,
                0,
                uri => {
                    console.log(uri);
                    studentAux.picture = uri;
                },
                'base64'
            );
        }
        this.setState({newStudent: studentAux});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await api.post("/students", this.state.newStudent);
        let newStudents = this.state.students.concat([response.data]);
        console.log(newStudents);
        this.setState({ students: newStudents});
    }

    render() {
        return (
            <div className="Crud">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="homeLink" to="/" color="inherit">
                        Home
                    </Link>
                    <Typography color="textPrimary">Students</Typography>
                </Breadcrumbs>
                <div className="newStudentSection" align="center">
                    <h2 className="title">New Student</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                id="name"
                                label="Name"
                                name="name"
                                className="nameTextField"
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="address"
                                label="Address"
                                name="address"
                                className="addressTextField"
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </div>
                        <input
                            accept="image/jpg"
                            className="pictureButton"
                            name="picture"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={this.handleChange}
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" className="pictureButton_">
                                Upload picture
                            </Button>
                        </label>
                        <div className="submitButton">
                            <Button type="submit" variant="contained" color="primary"> Create Student </Button>
                        </div>
                    </form>
                </div>
                <div className="studentSection" align="center">
                    <h2 className="title">Students</h2>
                        <List className="studentList">
                        {this.state.students.map(student =>
                            <div key={student.id}>
                                    <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={student.picture} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={student.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {student.address}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />

                                    <Link className="showButton" to={`/students/${student.id}`}>
                                        <Button variant="contained">Show</Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="deleteButton"
                                        onClick={() =>this.deleteStudent(student.id)}>
                                        Delete
                                    </Button>
                                    </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                            )}
                            </List>
                </div>
            </div>
        );
    }
}

export default Crud;
