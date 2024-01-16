import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [error, setError] = React.useState(false);
    const [doubleName, setDoubleName] = React.useState(false);
    const [doubleEmail, setDoubleEmail] = React.useState(false);
    const [emailProposition, setEmailProposition] = React.useState('');
    const [nameProposition, setNameProposition] = React.useState('');


    const navigate = useNavigate();
    useEffect(()=> {

        const auth = localStorage.getItem('user');  
        if(auth){
            navigate('/');
        }
    }, [])
    
    const collectData=async()=> {        
            let result = await fetch("https://uuu-3fwk.onrender.com/register", { /*Remplacement du localhost pour connecter le BA au FE  */
            method:'post',
            body:JSON.stringify({name, email, password, confirmPassword}),
            headers:{
                'Content-Type':'application/json'
            }
        });
            result= await result.json();  
            if(!name || !email || !password || !confirmPassword){
                setError(true);
                return false;
            }
            if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            localStorage.setItem('cart', JSON.stringify([])); // Ajout panier
            navigate("/");
            }
            if(result.doubleName){
                setDoubleName(true);
                setNameProposition(result.doubleName.name + "2");
            }
            if(result.doubleEmail){
                setDoubleEmail(true);
                setEmailProposition(result.doubleEmail.email + "2");
            }
        
    };
       
    return (
        <div className="register">
            <h1>Inscription</h1>
            <input className="inputBox" type="text" placeholder="Entrez un nom"
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            {error && !name && <span className='invalid-input-register'>Entrez un nom !</span>}
            {doubleName && <span className='invalid-input-register'>Déjà pris ! voici une suggestion pour vous : {nameProposition}</span>}
            <input className="inputBox" type="text" placeholder="Entrez un email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            {error && !email && <span className='invalid-input-register'>Entrez un email !</span>}
            {doubleEmail && <span className='invalid-input-register'>Déjà pris ! voici une suggestion pour vous : {emailProposition}</span>}
            <input className="inputBox" type="password" placeholder="Entrez un mot de passe"
            value = {password} onChange={(e)=>setPassword(e.target.value)}
            />
            {error && !password && <span className='invalid-input-register'>Choisissez votre mot de passe !</span>}
            <input className="inputBox" type="password" placeholder="Confirmez votre mot de passe !"
            value = {confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            {error && !confirmPassword && <span className='invalid-input-register'>Confirmez votre mot de passe !</span>}
            <button onClick={collectData} className="appButton" type="button">S'inscrire</button>
        </div>
    )
}

export default SignUp;