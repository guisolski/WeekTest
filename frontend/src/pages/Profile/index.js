import React, {useState,useEffect} from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongID');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        api.get('profile', {
            headers : {
                Authorization: ongID
            }
        }).then(resp =>{setIncidents(resp.data)});
    },[ongID]);
    
    async function handleDeleteIncidente(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers : {
                    Authorization: ongID
                }});
            setIncidents(incidents.filter(incident => incident.id !== id));  
        } catch (error) {
            alert("Erro ao deletar.");
        }
    }
    async function handleLogoOut(id){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso.</Link>
                <button onClick= {handleLogoOut} type="button">
                <FiPower  size={18} color="#E02441" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>
                        <strong>Descrição:  </strong>
                        <p>{incident.description}</p> 
                        <strong>Valor:  </strong>
                        <p>{Intl.NumberFormat('pt-BR',{style : 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick = {() => handleDeleteIncidente(incident.id)}type="button">
                            <FiTrash2 size={20} color="#08a8b3"/>
                        </button>
                    </li>
               ))}
            </ul>
        </div>
    );
};