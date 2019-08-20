import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './styles.css';
import logo from '../../logo.svg';


class Home extends Component{
    state = {students: []}

    componentDidMount() {
    }

    render() {
        return (
            <div className="home">
                <div align="center">
                    <div className="imageDiv">
                        <img src={logo} alt="DeltaInova's logo" />
                    </div>
                    <h2 className="title">Controle de Alunos</h2>
                    <Link to="/students" align="center">
                    <Button variant="contained" color="primary">
                        Acessar CRUD
                    </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default (Home);
