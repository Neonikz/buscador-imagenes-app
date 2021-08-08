import React, { useState } from 'react';
import { Error } from './Error';

export const Form = ({ setSearch }) => {

    //State de lo que se va a buscar
    const [word, setWord] = useState('');

    //State del error
    const [error, setError] = useState(false);


    //Submit del form
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if( !word.trim() ){
            return setError(true);
        }
        setError(false);

        //Enviar el termino de busqueda 
        setSearch( word );
    }


    return (
        <form
            onSubmit={ handleSubmit }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: programacion o música"
                        onChange={ e => setWord(e.target.value) }
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error && <Error message="Agrega un término de busqueda." /> }
        </form>
    )
}
