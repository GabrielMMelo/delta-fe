import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

class Crud extends Component {
    state = {students: []}

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

    render() {
        return (
            <div className="App">
                <Link to="/"> Home </Link>
                <h1>Students</h1>
                {this.state.students.map(student =>
                    <div key={student.id}>
                        {student.name} {student.address}
                        <Link to={`/students/${student.id}`}>Show</Link>
                        <button onClick={() =>this.deleteStudent(student.id)}>Delete</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Crud;
