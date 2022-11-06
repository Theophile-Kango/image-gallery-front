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
        <div className="container">
            <header className="jumbotron">
                <h1>Images Gallery</h1>
            </header>
            {content && content.length > 0 && content.map(
                imageGallerie => (
                    <div key={imageGallerie.id}>
                        <h3>{imageGallerie.title}</h3>
                        <p>{imageGallerie.description}</p>
                        <div>
                            <img alt="Uploaded Image" src={imageGallerie.image} style={{width: "500px"}}  />
                        </div>
                        <small>Posted on {imageGallerie.date}</small>
                    </div>
                )
            )}
        </div>
    )
}

export default ImagesGallery;