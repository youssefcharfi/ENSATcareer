import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.css';

function CreateOffre() {

    const [offre, setOffre] = useState({
        title:'',
        description:'',
        entreprise:'',
        filiere:''
    })
    
    const [filieres, setFilieres] = useState([])
    
    const handleChange = (e) => {
        setOffre({...offre ,[e.target.id]: e.target.value})
    }

    const getFilieres = () =>{
        axios.get('http://localhost:7500/api/filieres/all')
             .then(res => {
                 setFilieres(res.data.filieres)
                 console.log(res.data)
            })
             .catch(err => console.log(err))
    }

    useEffect(() => getFilieres() ,[])

    const submitForm = (e) => {
        e.preventDefault();
       
        const {title, description, entreprise, filiere} = offre

        if(!title || !description || !entreprise || !filiere){
            toastr.warning("Veuillez remplir touts les champs avec les infos nécessaires","Attention")
            return
        }
        axios.post('http://localhost:7500/api/offres/create', offre)
             .then(() => toastr.success("l'offre est bien creer","Nouvelle Offre"))
             .catch(err => console.error(err))

        setOffre({
            title:'',
            description:'',
            entreprise:'',
            filiere:''
        })
    }
    
    return (
            <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                <center className="my-3 h3">Ajouter une nouvelle Offre</center>
                    <form onSubmit={submitForm.bind()}>
                        <div className="form-group my-1">
                            <label className="font-weight-bold" htmlFor="title">Titre :</label>
                            <input type="text" id="title"  className="form-control" value={offre.title} onChange={handleChange}/>
                        </div>
                        <div className="form-group my-3">
                        <label className="font-weight-bold" htmlFor="description">Description :</label>
                            <textarea id="description" className="form-control" value={offre.description} onChange={handleChange}/>
                        </div>
                        <div className="form-group my-3">
                            <label className="font-weight-bold" htmlFor="entreprise">Entreprise :</label>
                            <input  id="entreprise" type="text"  className="form-control" value={offre.entreprise} onChange={handleChange}/>
                        </div>
                        <div className="form-group my-4">
                            <label className="font-weight-bold" htmlFor="filiere">Filière :</label>
                            <select  id="filiere" className="form-control" value={offre.filiere} onChange={handleChange}>
                                <option value="0" disabled>choisit la filière visée</option>
                                {filieres && filieres.map((filiere, i) => (
                                    <option key={i} value={filiere._id} >{filiere.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-block btn-outline-primary my-2">Ajouter</button>
                    </form>
                </div>
            </div>
    )
}

export default CreateOffre
