import React from 'react'
import {Redirect} from 'react-router-dom'

import Modal from 'react-awesome-modal';

const queryString = require('query-string')

class Login extends React.Component {
     constructor(props){
          super(props)
          const params = queryString.parse(props.location.search);
          this.state = {
               redirect : false,
               msg:params.msg,
               showmodal:false
          }
     }

     login(event) {
          event.preventDefault();
          const requestInfo = {
               method: 'POST',
               body: JSON.stringify({
                    email: this.login_email.value,
                    password: this.login_password.value,
                    redirect: false
               }),
               headers: new Headers({
                    'Content-type': 'application/json'
               })
          }

          fetch('http://localhost:3001/auth/signin',requestInfo)
          .then(response => {
               if(response.ok) {
                    return response.text();
               } else {
                    throw new Error('Invalid email or password');
               }
          })
          .then(token => {
               localStorage.setItem('auth-token',token);
               this.setState({redirect:true});
          })
          .catch(err => {
               this.setState({msg:'Erro: usuário ou senha inválidos.'});
               localStorage.removeItem('auth-token');
          });
     }

     register(event) {
          event.preventDefault();
          var name = this.register_name.value;
          var enrollment = this.register_enrollment.value;
          var email = this.register_email.value;
          var password = this.register_password.value;
          var confirm_password = this.register_confirmpassword.value;

          var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

          if(name === '') {
               this.setState({msg:'Informe seu nome completo'});
          } else if (enrollment === '') {
               this.setState({msg:'Informe sua matrícula'});
          } else if (email === '' || !regex.test(email)) {
               this.setState({msg:'Informe um endereço de email válido'});
          } else if (password === '' ) {
               this.setState({msg:'Informe uma senha'});
          } else if (confirm_password === '' ) {
               this.setState({msg:'Informe uma confirmação de senha'});
          } else if (password !== confirm_password ) {
               this.setState({msg:'A senha e confirmação de senha não correspondem'});
          } else {
               const requestInfo = {
                    method: 'POST',
                    body: JSON.stringify({
                         name: name,
                         enrollment: enrollment,
                         email: email,
                         password: password
                    }),
                    headers: new Headers({
                         'Content-type': 'application/json'
                    })
               }

               fetch('http://localhost:3001/auth/signup',requestInfo)
               .then(response => {
                    if(response.ok) {
                         return response.text();
                    } else {
                         throw new Error('Failed to register');
                    }
               })
               .then(msg => {
                    this.registerform.reset();
                    this.setState({
                         showmodal : true,
                         msg:''
                     });
               })
               .catch(err => {
                    this.setState({msg:'Erro: matrícula ou email indispnível'})
               });
          }
     }

      closeModal() {
          this.setState({
              showmodal : false
          });
      }


     render() {
          if(this.state.redirect) {
               return(
                    <Redirect to='/classes'/>
               )         
          }
          
          return (
               <div className="container">
                    <Modal visible={this.state.showmodal} width="400" height="230" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                         <div className="modal-container">
                              <p>Usuário cadastrado com sucesso</p>
                              <button type="button" onClick={() => this.closeModal()}>Fechar</button>
                         </div>
                    </Modal>
                    <div className="row">
                         <div className="col-md-6 col-md-offset-3">
                              <div className="panel panel-login">
                                   <div className="panel-heading">
                                        <div className="row">
                                             <div className="col-xs-6">
                                                  <button type="button" id="login-form-link" className="active">Login</button>
                                             </div>
                                             <div className="col-xs-6">
                                                  <button type="button" id="register-form-link">Cadastro</button>
                                             </div>
                                        </div>
                                        <hr />
                                   </div>
                                   <span id="error-msg" className="error-span">{this.state.msg}</span>
                                   <div className="panel-body">
                                        <div className="row">
                                             <div className="col-lg-12">
                                                  <form id="login-form" className="login-form" onSubmit={this.login.bind(this)} method="post">
                                                       <div className="form-group">
                                                            <input type="text" className="form-control" ref={(input) => this.login_email = input} placeholder="Email"/>
                                                       </div>
                                                       <div className="form-group">
                                                            <input type="password" className="form-control" ref={(input) => this.login_password = input} placeholder="Senha" />
                                                       </div>
                                                       <div className="form-group">
                                                            <div className="row">
                                                                 <div className="col-sm-6 col-sm-offset-3">
                                                                      <input type="submit" name="login-submit" className="form-control btn btn-login" value="Login" />
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className="form-group">
                                                            <div className="row">
                                                                 <div className="col-lg-12">
                                                                      <div className="text-center">
                                                                           <a href="/recoverpassword" className="forgot-password">Esqueceu a senha?</a>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </form>
                                                  <form id="register-form" className="register-form" onSubmit={this.register.bind(this)} method="post" ref={(form) => this.registerform = form}>
                                                       <div className="form-group">
                                                            <input id="register-name" type="text" className="form-control" ref={(input) => this.register_name = input} placeholder="Nome completo"/>
                                                       </div>
                                                       <div className="form-group">
                                                            <input id="register-enrollment" type="text" className="form-control" ref={(input) => this.register_enrollment = input} placeholder="Matrícula"/>
                                                       </div>
                                                       <div className="form-group">
                                                            <input id="register-email" type="email" className="form-control" ref={(input) => this.register_email = input} placeholder="Email"/>
                                                       </div>
                                                       <div className="form-group">
                                                            <input id="register-password" type="password" className="form-control" ref={(input) => this.register_password = input} placeholder="Senha" />
                                                       </div>
                                                       <div className="form-group">
                                                            <input id="register-confirm-password" type="password" className="form-control" ref={(input) => this.register_confirmpassword = input} placeholder="Confirmação de senha" />
                                                       </div>
                                                       <div className="form-group">
                                                            <div className="row">
                                                                 <div className="col-sm-6 col-sm-offset-3">
                                                                      <input type="submit" className="form-control btn btn-register" value="Cadastrar" />
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </form>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default Login