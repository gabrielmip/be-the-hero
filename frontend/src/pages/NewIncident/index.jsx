import React, {useState} from "react";
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import logoImage from '../../assets/logo.svg';

import './styles.css';
import api from "../../services/api";

function NewIncident () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    const history = useHistory();

    const ngoId = localStorage.getItem('ngoId');

    async function handleNewIncident (event) {
        event.preventDefault();
        const data = {title, description, value};
        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ngoId
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o novo caso. Tente novamente.');
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Logo from the application, Be the hero all caps"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver este caso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;