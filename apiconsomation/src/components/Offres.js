import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import toastr from 'toastr'
import { Link } from 'react-router-dom'

function Offres() {

    const [offres, setOffres] = useState([])
    
    const [filieres, setFilieres] = useState([])

    const getAllOffres = () => {
        axios.get('http://localhost:7500/api/offres/all')
             .then(res => {
                 setOffres(res.data.offres)
                })
             .catch(err => console.error(err))
    }

    const getFilieres = () =>{
        axios.get('http://localhost:7500/api/filieres/all')
             .then(res => {
                 setFilieres(res.data.filieres)
                 console.log(res.data)
            })
             .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllOffres()
        getFilieres()
    },[])

    const deleteOffre = (id) => {
        if(window.confirm("Voulez-vous supprimer cette offre ?"))
        {
            axios.delete('http://localhost:7500/api/offres/'+id)
                 .then(res => {
                     if(res.status==204){
                         toastr.success("l'offre a été bien supprimer",'suppression avec succes')
                         getAllOffres()
                         return;
                     }
                     else{
                        toastr.success("",'Probleme de suppression')
                        return;
                     }
                 })
                 .catch(err => console.log(err))
        }
    }

    const changeFiliere = (idFiliere) => {
        //console.log(idFiliere)
        axios.get('http://localhost:7500/api/offres/byfiliere/'+idFiliere)
             .then(res => {
                 setOffres(res.data.offres)
                })
             .catch(err => console.error(err))
    }

    return (
        <div className="row">
        <div className="col-md-9">
        {offres && offres.map((offre, i) => (
            <div className="card w-100 my-3" key={i}>
                <div className="card-body">
                    <i style={{float:"right", cursor:"pointer", color:"red"}} 
                        className="fas fa-2x fa-times" title="supprimer l'offre"
                        onClick={deleteOffre.bind(this,offre._id)}>
                    </i>
                    <h5 className="card-title font-weight-bold">{offre.title}</h5>
                    <p className="card-text">
                        {offre.description}
                    </p>
                    <span style={{textDecoration:'underline'}} className="badge rounded-pill bg-light"><h6>Filière Concernée : {offre.filiere.name}</h6></span>
                    <p className="text-muted">Added {moment(offre.createdAt).startOf().fromNow()}</p>
                    <Link className="btn btn-outline-success" to={'/offres/edit/'+offre._id}><i className="far fa-edit"></i> Modifier</Link>
                </div>
            </div> 
        ))}
        </div>
        <div className="col-md-3 my-5">
            <h5 className='card-title'>Filtre par filière</h5>
            <div className='card mr-2'>
                {filieres.map((filiere,i) => (
                    <div key={i} className="my-1 ml-2">
                        <label htmlFor={`${i}-${filiere.name}`}>
                            <input type="radio" name="filiere" id={`${i}-${filiere.name}`} className="mx-2" value={filiere._id} onChange={changeFiliere.bind(this,filiere._id)}/>
                            {filiere.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Offres
