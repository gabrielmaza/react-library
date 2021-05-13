import React from 'react';
import {Link} from 'react-router-dom';
import imgPers from './img/imgPers.jpg';
import imgCat from './img/imgCat.jpg';
import imgLib from './img/imgLib.jpg';

export default function Home() {
  
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-sm-4 my-2">
          <div class="card">        
            <img src={imgPers} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Personas</h5>
              <p class="card-text">Consulta el listado de personas.</p>
              <Link to="/personas" className="btn btn-primary">Ver personas</Link>          
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 my-2">
          <div class="card">        
            <img src={imgCat} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Categorias</h5>
              <p class="card-text">Explora las categorías.</p>            
              <Link to="/categorias" className="btn btn-primary">Ver categorias</Link>          
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 my-2">
          <div class="card">        
            <img src={imgLib} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">Libros</h5>
              <p class="card-text">Busca entre todos los libros.</p>
              <Link to="/libros" className="btn btn-primary">Ver libros</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }