import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api';

import logoImage from '../../assets/logo.svg';
import './styles.css';


function Profile () {
    const ngoName = localStorage.getItem('ngoName');
    const ngoId = localStorage.getItem('ngoId');
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    async function handleDeleteIncident (idToDelete) {
        try {
            await api.delete(`incidents/${idToDelete}`, {headers: {
                authorization: ngoId
            }});

            setIncidents(incidents.filter(({id}) => id !== idToDelete));
        } catch (error) {
            alert('Error ao deletar o incidente');
        }
    }

    function handleLogout () {
        localStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ngoId
            }
        }).then((response) => {
            setIncidents(response.data);
        })
    }, [ngoId]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be the hero logo"/>
                <span>Bem vinda, {ngoName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat(
                                'pt-BR',
                                {style: 'currency', currency: 'BRL'}
                            )
                            .format(incident.value)}
                        </p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile;