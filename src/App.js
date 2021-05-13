import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';

import AltaPersona from './Personas/AltaPersona';
import EditarPersona from './Personas/EditarPersona';
import ListadoPersona from './Personas/ListadoPersona';

import AltaCategoria from './Categorias/AltaCategoria';
import ListadoCategoria from './Categorias/ListadoCategoria';

import AltaLibro from './Libros/AltaLibro';
import EditarLibro from './Libros/EditarLibro';
import ListadoLibro from './Libros/ListadoLibro';


function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={Home} />

      <Route exact path="/personas" component={ListadoPersona} />
      <Route exact path="/personas/editar/:id" component={EditarPersona} />
      <Route exact path="/personas/agregar" component={AltaPersona} />

      <Route exact path="/categorias" component={ListadoCategoria} />
  
      <Route exact path="/categorias/agregar" component={AltaCategoria} />

      <Route exact path="/libros" component={ListadoLibro} />
      <Route exact path="/libros/editar/:id" component={EditarLibro} />
      <Route exact path="/libros/agregar" component={AltaLibro} />
     

      </Router>
    </div>
  );
}

export default App;

// No funcan
// -Categoría editar
// - Libros agregar (funciona pero por como esta hecho el server no agrega si no existe el id de la categoría o el de la persona)
// -Libros editar 
// - Libros borrar (seguramente no borra poque el server no deja borrar un libro que este prestado a una persona)