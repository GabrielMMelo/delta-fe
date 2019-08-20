import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: Mudar BG
// TODO: Alterar título

class Home extends Component{
    state = {students: []}

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2 align="center">Tela inicial </h2>
                <div align="center">
                    <Link to="/students" align="center">
                        Ir para CRUD
                    </Link>
                </div>
            </div>
        );
    }
}

export default (Home);
