import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const ImagesGallery = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getGalleries().then(
            response => {
                setContent(response.data);
            },
            error => {
                const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

                setContent(_content);
            }
        )
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h1>Images Gallery</h1>
            </header>
        </div>
    )
}

export default ImagesGallery;