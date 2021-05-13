import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListadoLibro() {
    
    const [categorias, setCategorias] = React.useState([]);
    const [personas, setPersonas] = React.useState([]);
    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');
 
   
        const [form, setForm] = React.useState(
            {nombre:"", 
            descripcion:"", 
            categoria_id: "", 
            persona_id: "",
        });

    const obtenerCategorias = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria').
            then((respuesta) => setCategorias(respuesta.data)) 
        } catch (e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    };

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona').
            then((respuesta) => setPersonas(respuesta.data))
        } catch (e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    };

    React.useEffect(() => {
        obtenerCategorias();
    }, []);

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    const handleChangeNombre = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeDescripcion = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeCategoria_id = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    };

    const handleChangePersona_id = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    };
    const traerLibros = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    }

    React.useEffect(() => {
        traerLibros();
        
    }, [])  

    const borrarLibro = async(idLibroABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/libro/' + idLibroABorrar.toString());
            toast.success("Realizado!")
            traerLibros();
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    }

    const devolverLibro = async(idDevolverLibro) => {
        try {
            await axios.put('http://localhost:3000/api/libro/devolver/' + idDevolverLibro.toString());
            toast.success("El libro queda disponible")
            traerLibros();
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    }
    
    return (
        <div className="container">
            <ToastContainer />
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Listado de libros</h2>
                    <Link to={"/libros/agregar"} className="btn btn-primary">Agregar</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Id de la persona </th>
                            <th>Id de la categoria</th>
                            <th></th>
                        </tr>
                     </thead>
                    <tbody>
                        {listado.map(unLibro => (
                            
                            <tr>
                                <td>{unLibro.nombre}</td>
                                <td>{unLibro.descripcion}</td>
                                <td>
                                    {unLibro.persona_id} |&nbsp;
                                   <Link onClick={() => devolverLibro(unLibro.id.toString())}>Devolver</Link> 
                                   
                                </td>
                                <td>{unLibro.categoria_id}
                                   
                                </td>
                                <td>

                                    <Link to={"/libros/editar/"+ unLibro.id.toString()}>Editar</Link> |&nbsp;
                                    <Link onClick={() => borrarLibro(unLibro.id.toString())}>Borrar</Link>
                                    
                                    

                                </td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    )
                    }

