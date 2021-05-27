import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Menu = (props) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: 'white' }
    }
    return { color: '#000' }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <Link className="navbar-brand" to="/">ENSATcareer</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link style={isActive(props.history, '/offres/add')} className="nav-link" to="/offres/add" >Nouvelle Offre</Link>
            </li>
            <li className="nav-item active">
              <Link style={isActive(props.history, '/offres')} className="nav-link" to="/offres" >Les Offres</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Menu)
