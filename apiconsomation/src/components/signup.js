import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      description:'',
      password:'',
      filiere:'',
      niveau:'',
      link:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      description: this.state.description,
      link: this.state.link,
      filiere: this.state.filiere,
      niveau:this.state.niveau
    };

    axios
      .post('http://localhost:7502/api/user/signup', data)
      .then(res => {
        this.setState({
            name: '',
            email:'',
            description:'',
            password:'',
            filiere:'',
            niveau:'',
            link:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Erreur d'inscription");
      })
  };

  render() {
    return (
      <div className="Singup">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Inscription</h1>
              <p className="lead text-center">
                inscrivez-vous ! 
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Nom et Prenom'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='email'
                    name='email'
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='password'
                    placeholder='password'
                    name='password'
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <div className='form-group'>
                  <input
                    type='password'
                    placeholder='password confirmation'
                    name='password1'
                    className='form-control'
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Description'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='link'
                    name='link'
                    className='form-control'
                    value={this.state.link}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'> 
                <p>Please select your gender:</p>
                 
                <input type="radio" id="GINF" name="ginf" value={this.state.filiere} Onchange={this.onChange} />
                <label for="ginf">Genie Informatique</label>
                <input type="radio" id="GSEA" name="gsea" value={this.state.filiere} Onchange={this.onChange}/>
                <label for="female">Genie systeme electroniques automatises </label>
                <input type="radio" id="gstr" name="gstr" value={this.state.filiere} Onchange={this.onChange}/>
                <label for="other">Genie systeme reseaux telecommunication</label>
                <input type="radio" id="gind" name="gind" value={this.state.filiere} Onchange={this.onChange}/>
                <label for="other">Genie Industriel et Logistiques</label>
                <input type="radio" id="AP" name="AP" value={this.state.filiere} Onchange={this.onChange}/>
                <label for="other">Annees Preparatoires</label>
                
                
                  
                </div>
                </div>
            

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;