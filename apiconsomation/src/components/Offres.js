import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import toastr from 'toastr'
import { Link } from 'react-router-dom'
import img1 from '../imgs/img1.jpg'
import img2 from '../imgs/img2.jpg'
import img3 from '../imgs/img3.jpg'

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
                     if(res.status===204){
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
        <div>
     <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src={img3} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={img2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={img1} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

        <div className="row">
        <div className="col-md-9">
        {offres && offres.map((offre, i) => (
            <div className="card w-100 my-3 border border-secondary" key={i}>
                <div className="card-body">
                    <i style={{float:"right", cursor:"pointer", color:"red"}} 
                        className="fas fa-2x fa-times" title="supprimer l'offre"
                        onClick={deleteOffre.bind(this,offre._id)}>
                    </i>
                    <h5 className="card-title font-weight-bold">{offre.title}</h5>
                    <p className="card-text">
                        {offre.description.substr(0,250)}<Link to={'/offres/'+offre._id}><a style={{color:"blue"}}> lire la suite...</a></Link>
                    </p>
                    <span style={{textDecoration:'underline'}} className="badge rounded-pill bg-light"><h6>Filière Concernée : {offre.filiere.name}</h6></span>
                    <p className="text-muted">Added {moment(offre.createdAt).startOf().fromNow()}</p>
                    <Link className="btn btn-outline-success" to={'/offres/edit/'+offre._id}><i className="far fa-edit"></i> Modifier</Link>
                    <Link className="btn btn-outline-info" to={'/offres/'+offre._id}><i class="fas fa-angle-double-right"></i> Details</Link>
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
        </div>
    )
}

export default Offres
