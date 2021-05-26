import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toastr from 'toastr'

function UpdateOffre(props) {


    const [offre, setOffre] = useState({
        title:'',
        description:'',
        entreprise:'',
        filiere:'',
        email:'',
        telephone:''
    })

    const handleChange = (e) => {
        setOffre({...offre ,[e.target.id]: e.target.value})
    }

    const [filieres, setFilieres] = useState([])

    const getOffre = () => {
        axios.get('http://localhost:7500/api/offres/'+props.match.params.id)
             .then(res => {
                 if(res.data.offre){
                     const offreSelected = res.data.offre
                     setOffre({
                         title: offreSelected.title,
                         description: offreSelected.description,
                         entreprise: offreSelected.entreprise,
                         filiere: offreSelected.filiere._id,
                         email: offreSelected.email,
                         telephone: offreSelected.telephone
                     })
                     return
                 }
                 else console.log('no data')
             })
             .catch(err => console.log(err))
    }

    const getFilieres = () =>{
        axios.get('http://localhost:7500/api/filieres/all')
             .then(res => {
                 setFilieres(res.data.filieres)
                 console.log(res.data)
            })
             .catch(err => console.log(err))
    }

    useEffect(()=>{ 
        getOffre()
        getFilieres()
        }
        ,[])

        const UpdateOffre = (e) => {
            e.preventDefault();
            const {title, description, entreprise, filiere} = offre
            
            if(!title || !description || !entreprise || !filiere){
                toastr.warning("Veuillez remplir touts les champs avec les infos nécessaires","Attention")
                return
            }

            axios.put('http://localhost:7500/api/offres/'+props.match.params.id, offre)
                 .then(() => toastr.success("l'offre est bien modifiée","Modification d'offre"))
                 .catch(err => console.error(err))
        }

    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                <center className="my-3 h3">Modification d'Offre</center>
                    <form onSubmit={UpdateOffre.bind()}>
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
                        <div className="form-group my-3">
                            <label className="font-weight-bold" htmlFor="entreprise">Email à contacter :</label>
                            <input  id="email" type="email"  className="form-control" value={offre.email} onChange={handleChange}/>
                        </div>
                        <div className="form-group my-3">
                            <label className="font-weight-bold" htmlFor="entreprise">Téléphone à contacter :</label>
                            <input  id="telephone" type="text"  className="form-control" value={offre.telephone} onChange={handleChange}/>
                        </div>
                        <button className="btn btn-block btn-outline-primary my-2">Modifier</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateOffre
