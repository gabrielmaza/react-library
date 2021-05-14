import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PrestarLibro(props) {
    const params = useParams();
    const [personas, setPersonas] = React.useState([]);
    const [form, setForm] = React.useState({
        nombre: "",
        persona_id: null,
    });

    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro/' + idLibro).
            then((respuesta) => setForm({nombre: respuesta.data.nombre, persona_id: respuesta.data.persona_id}))            
        } catch (e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    }

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
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id)
    }, [params])

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    const handleChangePersona_id = e => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async() => {
        // form
         try {
            await axios.put('http://localhost:3000/api/libro/prestar/' + params.id, form);
            props.history.push('/libros');
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
                    <h2>Prestar libro</h2>
                </div>
                <div className="col-8 mx-auto">
                    <div className=" m-4 p-3 bg-light">
                        <div className="col-12">
                            <label className="form-label mt-3">Título del libro</label>
                            <h4>{form.nombre}</h4>
                        </div>
                        <form className="row">                        
                            <div className="col-12">
                                <label className="form-label mt-3">Persona a prestar</label>
                                <input type="text" name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id} className="form-control"/>
                            </div>
                            {/* <div className="col-12">
                                <label className="form-label mt-3">Persona a prestar</label>
                                <input type="text" name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id} className="form-control"/>
                            </div> */}
                            {/* <div className="col-12">
                                <label htmlFor="input3" className="form-label mt-3">Persona a prestar</label>
                                <select name="persona_id" id="input3" onChange={handleChangePersona_id} className="form-select">
                                    <option>Seleccione una persona</option>
                                    {personas.map(unaPersona => (
                                        <option value={unaPersona.id}>
                                            {unaPersona.nombre} - Id: {unaPersona.id}
                                        </option>
                                    ))}
                                </select>                                                                
                            </div>  */}
                        </form>
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )


}
