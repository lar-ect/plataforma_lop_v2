import React from 'react'
import Modal from 'react-awesome-modal';

const queryString = require('query-string')

class ResetPassword extends React.Component {
     constructor(props) {
          super(props);
          const params = queryString.parse(props.location.search);
          
          this.state = {
               code : params.code,
               showmodal: false
          }

     }

     send(event){
          event.preventDefault();

          var password = this.password.value;
          var confirmpassword = this.confirmpassword.value;

          if (password === '' ) {
               this.setState({msg:'Informe a nova senha senha'});
          } else if (confirmpassword === '' ) {
               this.setState({msg:'Informe a confirmação da nova senha'});
          } else if (password !== confirmpassword ) {
               this.setState({msg:'A a nova senha e sua confirmação não correspondem'});
          } else {
               const requestInfo = {
                    method: 'POST',
                    body: JSON.stringify({
                         code: this.state.code,
                         password: password
                    }),
                    headers: new Headers({
                         'Content-type': 'application/json'
                    })
               }

               fetch('http://localhost:3001/auth/resetpassword',requestInfo)
               .then(response => {
                    if(response.ok) {
                         return response.text();
                    } else {
                         throw new Error('Failed to register');
                    }
               })
               .then(msg => {
                    this.resetpasswordform.reset();
                    this.setState({
                         showmodal : true,
                         msg:''
                     });
               })
               .catch(err => {
                    this.setState({msg:'Erro: o link usado expirou ou é inválido.'})
               });
          }
     }

     closeModal() {
          this.setState({
              showmodal : false
          });
      }

     render(){
          return(
               <div className="container">
                    <Modal visible={this.state.showmodal} width="400" height="230" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                         <div className="modal-container">
                              <p>Senha alterada com sucesso.</p>
                              <button type="button" onClick={() => this.closeModal()}>Fechar</button>
                         </div>
                    </Modal>
                    <div className="row">
                         <div className="col-md-6 col-md-offset-3">
                              <div className="panel panel-login">
                                   <span id="error-msg" className="error-span">{this.state.msg}</span>
                                   <div className="panel-body">
                                        <div className="row">
                                             <div className="col-lg-12">
                                                  <form id="resetpassowrd-form" className="login-form" onSubmit={this.send.bind(this)} method="post" ref={(form) => this.resetpasswordform = form}>
                                                       <div className="form-group">
                                                            <input id="password" type="password" className="form-control" ref={(input) => this.password = input} placeholder="Nova senha" />
                                                       </div>
                                                       <div className="form-group">
                                                            <input id="confirm-password" type="password" className="form-control" ref={(input) => this.confirmpassword = input} placeholder="Confirmação da nova senha" />
                                                       </div>
                                                       <div className="form-group">
                                                            <div className="row">
                                                                 <div className="col-sm-6 col-sm-offset-3">
                                                                      <input type="submit" name="login-submit" className="form-control btn btn-login" value="Enviar" />
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

export default ResetPassword