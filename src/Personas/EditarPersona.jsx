import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarPersona(props) {
   const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        alias:'',
    })

    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona/'+idPersona).
            then((response) => setForm({nombre: response.data.nombre, apellido: response.data.apellido, alias: response.data.alias}))
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
        buscarPersonaPorId(params.id)
    }, [params])

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeApellido = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeAlias = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }
    
    const guardar = async() => {
         try{
            await axios.put('http://localhost:3000/api/persona/'+ params.id, form);
            props.history.push('/personas');
        }
         catch(e) {
            toast.error(e.response.data.message)
        }
    }


    return (
        <div className="container"> 
            <ToastContainer />
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Editar persona</h2>
                </div>
                <div className="col-8 mx-auto">
                    <div className=" m-4 p-3 bg-light">
                        <form className="row">
                            <div className="col-12">
                                <label htmlFor="input1" className="form-label mt-3">Nombre</label>
                                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} id="input1" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input2" className="form-label mt-3">Apellido</label>
                                <input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido} id="input2" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input3" className="form-label mt-3">Alias</label>
                                <input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleChangeAlias} id="input3" className="form-control"/>
                            </div>
                        </form>
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
