import React from 'react';
import { Image } from './Image';

export const ImageList = ({ images }) => {
    return (
        <div className="col-12 p-5 row">
            { images.map( image =>(
                <Image 
                    key={ image.id }
                    image={image}
                />
            ))}
            
        </div>
    )
}
