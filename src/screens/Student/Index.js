import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Student extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        student: {
            name: '',
            address: '',
            picture: ''
        }, id: -1
    };

    async componentDidMount() {
        const { id } = await this.props.match.params;
        this.setState({ id: id });
        const response = await api.get(`/students/${id}`);
        this.setState({ student: response.data });
    }

    handleChange(event) {
        let studentAux = this.state.student;
        if (event.target.name === "name")
            studentAux.name = event.target.value;
        else if (event.target.name === "address")
            studentAux.address = event.target.value;
        else if (event.target.name === "picture"){
            let files = event.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (event) => {
                studentAux.picture = event.target.result;
            };
        }
        this.setState({student: studentAux});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await api.put(`/students/${this.state.id}`, this.state.student);
    }

    render() {
        const { student } = this.state;

        return (
            <div align="center">

                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="homeLink" to="/" color="inherit">
                        Home
                    </Link>
                    <Link className="studentLink" to="/students" color="inherit">
                        Students
                    </Link>
                    <Typography color="textPrimary">{student.name}</Typography>
                </Breadcrumbs>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            id="name"
                            label="Name"
                            name="name"
                            value={student.name}
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
                            value={student.address}
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
                        <Button type="submit" variant="contained" color="primary"> Update Student </Button>
                    </div>
                </form>
            </div>
        );
    }
}
