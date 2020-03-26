import React, {useState} from 'react';
import './styles.css';
import logoImage from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [discripition, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongID = localStorage.getItem('ongID');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            discripition,
            value
        };
        try {
           await api.post('incidents',data, {
            headers : {
                Authorization: ongID
            }
           });
           history.push('/profile');
        } catch (error) {
            alert("Erro ao cadastrar.")
        }
        
    }
    return (
      <div className="new-incedent-container">
           <div className="content">
               <section>
                    <img src={logoImage} alt="Be The Hereo"></img>
                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detelhamente para encontrar um herói para resolver isso.
                    </p>
                    <Link to="/profile" className="back-link"> <FiArrowLeft size={16} color="#E02041"/>Home.</Link>
               </section>

               <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange= {e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={discripition}
                        onChange= {e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange= {e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">Cadastrar</button>
               </form>
           </div>
       </div>
    );
};