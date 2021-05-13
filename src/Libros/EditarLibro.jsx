import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarLibro(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '', 
        descripcion: '', 
    });

    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro/' + idLibro).
            then((respuesta) => setForm({nombre: respuesta.data.nombre, descripcion: respuesta.data.descripcion}))
        } catch(e) {
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

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = e => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    };

    const guardar = async() => {
        // form
         try {
            await axios.put('http://localhost:3000/api/libro/' + params.id, form);
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
                    <h2>Editar libro</h2>
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
                                <label htmlFor="input2" className="form-label mt-3">Descripción</label>
                                <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion} onChange={handleChangeDescripcion} id="input2" className="form-control"/>
                            </div>
                        </form>
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


            