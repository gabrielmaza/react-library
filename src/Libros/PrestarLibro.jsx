import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PrestarLibro(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        persona_id: null,
    });

    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await (await axios.get('http://localhost:3000/api/libro/' + idLibro)).
            then((respuesta) => setForm({nombre: respuesta.data.nombre, persona_id: respuesta.data.persona_id}))            
        } catch (e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.message);
            }
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id)
    }, [params])

    const handleChangePersona_id = e => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async() => {
        // form
         try {
            await axios.put('http://localhost:3000/api/libro/' + params.id, form);
            // props.history.push('/libros');
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.message);
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
                        <form className="row">                        
                            <div className="col-12">
                                <fieldset disabled>
                                        <label htmlFor="disabledTextInput" className="form-label mt-3">Nombre</label>
                                        <input type="text" name="nombre" placeholder="nombre" value={form.nombre} id="disabledTextInput" className="form-control"/>
                                </fieldset>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input4" className="form-label mt-3">Persona</label>
                                <input type="text" name="persona" placeholder="persona" value={form.persona_id} onChange={handleChangePersona_id} id="input4" className="form-control"/>
                            </div>
                            {/* <div className="col-12">
                                <label htmlFor="input3" className="form-label mt-3">Persona</label>
                                <select name="persona_id" id="input3" onChange={handleChangePersona_id} className="form-select">
                                    <option selected>Seleccione una persona</option>
                                    {personas.map(unaPersona => (
                                        <option value={unaPersona.id}>
                                            {unaPersona.nombre}
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
