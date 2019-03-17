import React from 'react'
import Modal from 'react-awesome-modal';

class RecoverPassword extends React.Component {
     constructor(){
          super()
          this.state = {
               err_msg:'',
               showmodal:false
          }
     }

     closeModal() {
          this.setState({
              showmodal : false
          });
      }

     send(event) {
          event.preventDefault();

          var email = this.email.value;

          var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

          if (email === '' || !regex.test(email)) {
               this.setState({err_msg:'Informe um endereço de email válido'});
          } else {
               const requestInfo = {
                    method: 'POST',
                    body: JSON.stringify({
                         email: email
                    }),
                    headers: new Headers({
                         'Content-type': 'application/json'
                    })
               }

               fetch('http://localhost:3001/auth/recoverpassword',requestInfo)
               .then(response => {
                    if(response.ok) {
                         return response.text();
                    } else {
                         throw new Error('Invalid email');
                    }
               })
               .then(textresponse => {
                    this.setState({showmodal:true});
                    
               })
               .catch(err => {
                    this.setState({err_msg:'Endereço de email informado não está cadastrado'})
               });
          }
     }

     render() {
          return(
               <div>
                    <Modal visible={this.state.showmodal} width="400" height="280" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                         <div className="modal-container">
                              <p>Uma mensagem de recuperação foi enviada para o endereço de email informado.</p>
                              <button type="button" onClick={() => this.closeModal()}>Fechar</button>
                         </div>
                    </Modal>
                    <div className="container form-group recover-email-content">
                         <span id="error-msg" className="error-span">{this.state.err_msg}</span>
                         <p>Para recuperar a sua senha, forneça o endereço de email cadastrado.</p>
                         <form id="recover-password-form" onSubmit={this.send.bind(this)} method="post">
                              <div className="row">
                                   <div className="col-sm-10">
                                        <input type="email" className="form-control" ref={(input) => this.email = input} placeholder="Email cadastrado"/>
                                   </div>
                                   <div className="col-sm-2">
                                        <input type="submit" className="form-control btn recover-email-button" value="Recuperar" />
                                   </div>
                              </div>
                         </form>
                                                       
                    </div>
               </div>
          )
     }
}

export default RecoverPassword;