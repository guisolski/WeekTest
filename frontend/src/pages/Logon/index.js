import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import './styles.css';

import api from '../../services/api';
import herosImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';

export default function Logon(){
    const [id,setID] = useState('');
    const histroy = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try {
            const resp = await api.post('sessions', {id});
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', resp.data.name);
            histroy.push('/profile');
        } catch (err) {
            alert("Erro in login");
        }
    }
    return(
        <div className="logo-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Seu ID" value={id} onChange={e=> setID(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link"> <FiLogIn size={16} color="#E02041"/>Não tenho Cadastro</Link>
                </form>
            </section>
            <img src={herosImage} alt="HeroesPng"/>
        </div>
    );
}