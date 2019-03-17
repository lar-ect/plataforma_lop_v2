import React from 'react'
import {Link} from 'react-router-dom'

class Cabecalho extends React.Component {
     render() {
          const loggedIn = localStorage.getItem('auth-token') !== null;
          let button;
          if(loggedIn) {
               button = <li><Link to='/logout'>Sair</Link></li>
          }

          return (
               <div>
                    <div className='jumbotron text-center'>
                         <h1>Bem vindo!</h1>
                         <p>Pronto para começar a praticar a programação?</p>
                         <form>
                              <div className='input-group'>
                                   
                              </div>
                         </form>
                    </div>
                    <nav className='navbar navbar-default navbar-fixed-top'>
                         <div className='container'>
                              <div className='navbar-header'>
                                   <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                                        <span className='icon-bar'></span>
                                        <span className='icon-bar'></span>
                                        <span className='icon-bar'></span>
                                   </button>
                                   <Link className='navbar-brand' to='/'>Logo</Link>
                              </div>
                              <div className='collapse navbar-collapse' id='myNavbar'>
                                   <ul className='nav navbar-nav navbar-right'>
                                        {button}
                                   </ul>
                              </div>
                         </div>
                    </nav>
               </div>
          )
     }
}

export default Cabecalho