import React, {Component} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

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
        this.setState({student: studentAux});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await api.put(`/students/${this.state.id}`, this.state.student);
    }

    render() {
        const { student } = this.state;

        //<h1>{student.picture}</h1>
        return (
            <div align="center">
                <Link to="/students">Voltar</Link>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={student.name} onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" value={student.address} onChange={this.handleChange}/>
                </div>
                <div>
                    <button> Update </button>
                </div>
                </form>
            </div>
        );
    }
}
