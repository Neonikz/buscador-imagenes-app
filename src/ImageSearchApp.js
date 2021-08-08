import React, { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { ImageList } from './components/ImageList';

export const ImageSearchApp = () => {

    //State de la busqueda
    const [search, setSearch] = useState('');
    //State de las imagenes
    const [images, setImages] = useState([]);
    //State de la pagina actual
    const [actualPage, setActualPage] = useState(1);
    //State del total de paginas
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        
        if( !search ) return;

        const APIConsult = async() => {

            const imagesPerPage = 30;
            const key = '22839865-87bb61b94990bb9846c528165';
            const url = `https://pixabay.com/api/?key=${ key }&q=${search}&per_page=${ imagesPerPage }&page=${actualPage}`;
    
            const resp = await fetch( url );
            const result = await resp.json();
            
            setImages( result.hits );

            //Calcular el total de paginas
            const calculateTotalPages = Math.ceil( result.totalHits / imagesPerPage );
            setTotalPages( calculateTotalPages );

            //Mover la pantalla hacia arriba
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({ behavior: 'smooth' });
        }

        APIConsult();

    }, [search, actualPage]);

    //Definir la pagina anterior
    const previousPage = () => {
        const newActualPage = actualPage - 1;
        if( newActualPage === 0 ) return;
        setActualPage( newActualPage );
    }
    
    //Definir la pagina siguiente
    const nextPage = () => {
        const newActualPage = actualPage + 1;
        if( newActualPage > totalPages ) return;
        setActualPage( newActualPage );
    }
    

    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imagenes</p>

                <Form
                    setSearch={ setSearch }
                />
            </div>

            <div className="row justify-content-center">
                <ImageList
                    images={ images }
                />

                { ( actualPage === 1) ? null : (
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={ previousPage }
                    >&laquo; Anterior</button>
                ) }

                { ( actualPage === totalPages ) ? null : (
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={ nextPage }
                    >Siguiente &raquo;</button>
                )}
            </div>
        </div>
    )
}
