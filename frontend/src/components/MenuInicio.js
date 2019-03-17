import React from 'react'

class MenuInicio extends React.Component {
     render() {
          return (
               <div>
                    <ul className="nav nav-tabs justify-content-center">
                         <li className="nav-item">
                              <a className="nav-link active" href="#">Listas de exercícios</a>
                         </li>
                         <li className="nav-item">
                              <a className="nav-link" href="#">Listas de laboratório</a>
                         </li>
                         <li className="nav-item">
                              <a className="nav-link" href="#">Provas anteriores</a>
                         </li>
                    </ul>
               </div>
          )
     }
}

export default MenuInicio