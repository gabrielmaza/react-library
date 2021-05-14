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
                            <th>Id de la categoria</th>
                            <th>Id de la persona </th>
                            <th></th>
                            <th></th>
                        </tr>
                     </thead>
                    <tbody>
                        {listado.map(unLibro => (
                            
                            <tr>
                                <td>{unLibro.nombre}</td>
                                <td>{unLibro.descripcion}</td>
                                <td>{unLibro.categoria_id}</td>
                                <td>{unLibro.persona_id}</td>
                                <td><Link onClick={() => devolverLibro(unLibro.id.toString())}>Devolver</Link></td>
                                <td>
                                    <Link to={"/libros/editar/"+ unLibro.id.toString()} class="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </Link>
                                    <Link onClick={() => borrarLibro(unLibro.id.toString())} class="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    )
                    }

