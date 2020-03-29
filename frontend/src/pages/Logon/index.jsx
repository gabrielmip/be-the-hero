import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';

function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin (event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ngoId', id);
            localStorage.setItem('ngoName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login. Tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Logo from the app be the hero"/>
                <form className="form" onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="People united"/>
        </div>
    );
}

export default Logon;