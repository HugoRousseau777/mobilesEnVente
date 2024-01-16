import React from 'react';
const AddProduct =  ()=>{

    const [name, setName] = React.useState(''); // No need to import !
    const [price, setPrice] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const conditionButtons = document.getElementsByClassName("conditionButton");
    console.log(conditionButtons);
    const [countPerfect, setCountPerfect] = React.useState(false);
    const [countGood, setCountGood] = React.useState(false);
    const [countOk, setCountOk] = React.useState(false);
    const [countBad, setCountBad] = React.useState(false);

    const perfecto = async() => {
         setCondition("Perfect");
         setCountGood(false);
         setCountOk(false);
         setCountBad(false);
         setCountPerfect(true);
         Array.from(conditionButtons)[1].classList.remove("selected");
         Array.from(conditionButtons)[2].classList.remove("selected");
         Array.from(conditionButtons)[3].classList.remove("selected");
         Array.from(conditionButtons)[0].classList.add("selected");
         if (countPerfect == true){
            setCountPerfect(false);
            conditionButtons[0].classList.remove("selected");
        }
    }
    
    const goodo = async() => {
         setCondition("Good");
         setCountGood(true);
         setCountOk(false);
         setCountBad(false);
         setCountPerfect(false);
         Array.from(conditionButtons)[0].classList.remove("selected");
         Array.from(conditionButtons)[2].classList.remove("selected");
         Array.from(conditionButtons)[3].classList.remove("selected");
         Array.from(conditionButtons)[1].classList.add("selected");
         if (countGood == true){
            setCountGood(false);
            conditionButtons[1].classList.remove("selected");
         }
    }

    const oko = async() => {
         setCondition("Ok");
         setCountGood(false);
         setCountOk(true);
         setCountBad(false);
         setCountPerfect(false);
         Array.from(conditionButtons)[1].classList.remove("selected");
         Array.from(conditionButtons)[3].classList.remove("selected");
         Array.from(conditionButtons)[0].classList.remove("selected");
         Array.from(conditionButtons)[2].classList.add("selected");
         if (countOk == true){
            setCountOk(false);
            conditionButtons[2].classList.remove("selected");
         }
    }

    const bado = async() => {
         setCondition("Bad");
         setCountGood(false);
         setCountOk(false);
         setCountBad(true);
         setCountPerfect(false);
         Array.from(conditionButtons)[1].classList.remove("selected");
         Array.from(conditionButtons)[2].classList.remove("selected");
         Array.from(conditionButtons)[0].classList.remove("selected");
         Array.from(conditionButtons)[3].classList.add("selected");
         if (countBad == true){
            setCountBad(false);
            conditionButtons[3].classList.remove("selected");
         }
    }
    
    const addProduct = async ()=>{
        if(!name || !price || !company || !condition){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id; // localStorage.getItem('user')._id doesnt work
        console.warn(userId);
        let result = await fetch("https://uuu-3fwk.onrender.com/add-product",{ // Doit être l'adresse de la route
            method:"post",
            body:JSON.stringify({name, price, condition, company, userId}),
            headers: {
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        /*setName('');
        setPrice('');
        setCondition('');
        setCompany(''); Plus fluide comme expérience*/ 
        alert("Product added !");
    }
 
    // size in select allows to show number of items to show
    // <button onClick={()=>setCondition("a")} When using set... directly in onClick, dont forget ()=>set...
    return (
        <div className="add-product">
            <h1>Mettre en vente un téléphone</h1>
            <select id="name-select" onChange={(e)=>{setName(e.target.value)}}>
                <option value="">Choisissez le mobile dans la liste</option>
                <option value="iphone 1">iphone 1</option>
                <option value="iphone 2">iphone 2</option>
                <option value="iphone 3">iphone 3</option>
                <option value="samsung 1">Samsung 1</option>
                <option value="samsung 2">samsung 2</option>
            </select>
            {error && !name && <span className='invalid-input'>Entrez un nom !</span>}
            <input id="price" type="number" step="50" placeholder="Enter your selling price" value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            {error && !price && <span className='invalid-input'>Entrez un prix !</span>}
            <div className="condition">
                <p>État de votre téléphone :</p>
                <div className="containerCondBut">
                <button className="conditionButton" onClick={()=> {
                    perfecto();
                    }}>Parfait</button> 
                <button className="conditionButton" onClick={()=>{setCondition("Good");
                goodo();
            }
            }>Bon</button> 
                <button className="conditionButton" onClick={()=>{setCondition("Ok")
                oko();
            }}>Correct</button> 
                <button className="conditionButton" onClick={()=>{setCondition("Bad")
                bado();
            }}>Mauvais</button> 
                </div>
            </div>
            {error && !condition && <span className='invalid-input'>Entrez l'état de votre téléphone !</span>}
            
            <select id="company" type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}}>
                <option value="">Sélectionnez l'origine du téléphone</option>
                <option value="Orange">Orange</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Nokia">Nokia</option>
                <option value="Novotel">Novotel</option>
                <option value="Nokia">Nokia</option>
            </select>
            {error  && !company && <span className='invalid-input'>Choisissez l'origine du téléphone</span>}
            <button id="addProduct" onClick={addProduct}>Mettre en vente</button>
        </div>
    )
                }

export default AddProduct;