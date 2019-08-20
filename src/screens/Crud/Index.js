import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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
            <div className="App">
                <Link to="/"> Home </Link>
                <div align="center">
                    <h2>New Student</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>name</label>
                            <input type="text" name="name" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>address</label>
                            <input type="text" name="address" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button> Create </button>
                        </div>
                    </form>
                </div>
                <div align="center">
                    <h1>Students</h1>
                    {this.state.students.map(student =>
                        <div key={student.id}>
                            {student.name} {student.address}
                            <Link to={`/students/${student.id}`}>Show</Link>
                            <button onClick={() =>this.deleteStudent(student.id)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Crud;
