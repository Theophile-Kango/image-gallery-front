import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const ImagesGallery = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        UserService.getGalleries().then(
            response => {
                setContent(response.data.image_galleries);
            },
            error => {
                const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

                setContent(_content);
            }
        )
    },[]);

    return (
        <div className="container-gluid images__gallery__container">
            <header className="jumbotron">
                <h1>Image Gallery</h1>
            </header>
            <div className="galleries">
                {content && content.length > 0 && content.map(
                    imageGallerie => (
                        <div key={imageGallerie.id} className="gallery">
                            <div>
                                <img alt="Uploaded Image" src={imageGallerie.image}  />
                                <figcaption><span>Posted on</span> {imageGallerie.date}</figcaption>
                            </div>
                            <h3>{imageGallerie.title}</h3>
                            <p>{imageGallerie.description}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default ImagesGallery;