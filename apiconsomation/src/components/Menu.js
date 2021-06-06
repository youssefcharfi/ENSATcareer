import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import  "./Menu.css"


const Menu = (props) => {

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: 'white' }
    }
    return { color: '#000' }
  }
  const styles = {
  
      fontSize: 30 // Define font size here in Pixels
    };
 
  
  

  return (
    <div> 
    <header>

	<nav class="navbar navbar-expand-lg">
		<div class="container">
			<a class="navbar-brand text-white" href="#"><i class="fa fa-graduation-cap fa-lg mr-2"></i>ENSATcareer</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="nvbCollapse">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item pl-1">
						<a class="nav-link" href={isActive(props.history, '/offres')} to="/offres"><i class="fa fa-home fa-fw mr-1"></i>Offres</a>
					</li>
					<li class="nav-item active pl-1">
						<a class="nav-link" href= "#"><i class="fa fa-th-list fa-fw mr-1"></i>Nouveautées</a>
					</li>
					<li class="nav-item pl-1">
						<a class="nav-link" href={isActive(props.history, '/offres/add')} to="/offres/add" ><i class="fa fa-info-circle fa-fw mr-1"></i>Ajouter un offre</a>
					</li>
					<li class="nav-item pl-1">
						<a class="nav-link" href="#"><i class="fa fa-lightbulb fa-fw  mr-1"></i>Presentation des filieres</a>
					</li>
					<li class="nav-item pl-1">
						<a class="nav-link" href="#"><i class="fa fa-user-plus fa-fw mr-1"></i>Partage d'experiences</a>
					</li>
					<li class="nav-item pl-1">
						<a class="nav-link" href="#"><i class="fa fa-sign-in fa-fw mr-1"></i>Contactes</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	</header>


	
  </div>
	
  )}
export default withRouter(Menu);
