import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import  "./Footer.css"


const   Footer = (props) => {

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
<footer>
		<div class="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-0">
			<div class="container">
				<div class="row">
					<div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 cizgi">
						<div class="card bg-secondary border-0">
							<div class="card-body text-light text-center">
								<h5 class="card-title text-white display-4"style={styles}>Youssef Charfi & Mohamed Ben Taher</h5>
							<p class="d-inline lead">Porejet en groupe © 2021<br/>
							<a href="#" class="text-light d-block lead">Ensatcareer</a>
							</p>
	
							</div>
						</div>
					</div>
					
					<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 cizgi">
						<div class="card bg-secondary border-0">
							<div class="card-body text-center">
								<h5 class="card-title text-white display-4" style={styles}>Contacter les administrateurs</h5>
								<a class="text-light d-block lead"  href="#"><i class="fa fa-phone mr-2"></i>+06 75 84 21 35</a>
								<a class="text-light d-block lead" href="#"><i class="fa fa-envelope mr-2"></i>admin123654@gmail.com</a>
							</div>
						</div>
					</div>
					
					<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
						<div class="card bg-secondary border-0">
							<div class="card-body text-center">
							<h5 class="card-title text-white display-4" style={styles}>Reaseaux Sociaux</h5>
					
									<a class="text-light" href="#"><i class="fa fa-facebook-square fa-fw fa-2x"></i></a>
								
									<a class="text-light" href="#"><i class="fa fa-twitter-square fa-fw fa-2x"></i></a>
								
									<a class="text-light" href="#"><i class="fa fa-instagram fa-fw fa-2x"></i></a>
								
									<a class="text-light" href="#"><i class="fa fa-linkedin fa-fw fa-2x"></i></a>
								
							</div>
						</div>
					</div>	
				</div>
			</div>
		</div>
	</footer>)}
    export default withRouter(Footer);