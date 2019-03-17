import React from 'react'
import {Redirect} from 'react-router-dom'

class Turmas extends React.Component {
     constructor() {
          super()
          this.state = {
               classes : {}
          }
     }
     
     componentWillMount() {
          const requestInfo = {
               method: 'GET',
               headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('auth-token')
               })
          }
          
          fetch('http://localhost:3001/class/myclasses',requestInfo)
          .then(response => {
               if(response.ok) {
                    return response.text();
               } else if(response.status === 401) {
                    throw new Error('Autenticação necessária');
               } 
               else  {
                    throw new Error(response.statusText);
               }
          })
          .then(classes => {
               
          })
          .catch(error => {
               this.setState({redirect:true,msg:error});
          });
     }

     render() {
          if(this.state.redirect) {
               return(
                    <Redirect to={`/?msg=${this.state.msg}`}/>
               )         
          }
          return (
               
               <div>
                    
               </div>
          )
     }
}

export default Turmas