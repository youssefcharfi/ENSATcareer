import axios from 'axios'
import React, { useState, useEffect } from 'react'
import moment from 'moment'

function OffreDetails(props) {

    const [offre, setOffre] = useState(
        {
            title:'',
            description:'',
            entreprise:'',
            filiere:'',
            createdAt:''
        }
    )

    const getOffre = () => {
        axios.get('http://localhost:7500/api/offres/'+props.match.params.id)
             .then(res => {
                 if(res.data.offre){
                     const offreSelected = res.data.offre
                     setOffre({
                         title: offreSelected.title,
                         description: offreSelected.description,
                         entreprise: offreSelected.entreprise,
                         filiere: offreSelected.filiere,
                         createdAt:offreSelected.createdAt
                     })
                     return
                 }
                 else console.log('no data')
             })
             .catch(err => console.log(err))
    }
    
    useEffect(() => getOffre(), [])


    return (
        <div className="row">
            <div className="col-md-2 ">
            </div>
            <div className="col-md-8 ">
                <div className="card">
                    <img
                        src="https://www.dreamjob.ma/wp-content/uploads/2018/01/Stage-Pr%C3%A9-Embauche-R%C3%A9mun%C3%A9r%C3%A9-PFE-DREAMJOB.MA_.jpg"
                        className="card-img-top "
                        style={{height:"350px"}}
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">{offre.title}</h5>
                        <p className="card-text">
                            {offre.description}
                        </p>
                        <span style={{textDecoration:'underline'}} className="badge rounded-pill bg-light"><h6>Filière Concernée : {offre.filiere.name}</h6></span>
                        <p className="card-text">
                            <small className="text-muted">Added {moment(offre.createdAt).startOf().fromNow()}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OffreDetails
