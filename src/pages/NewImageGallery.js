import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import { createGallerie } from "../actions/auth";

const required = value => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const NewImageGallery = () => {
    let navigate = useNavigate();

    const form = useRef();
    const CheckBtn = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onTitleChange = e => {
        const title = e.target.value;
        setTitle(title);
    }

    const onChangeDescription = e => {
        const description = e.target.value;
        setDescription(description);
    }

    const onChangeImage = e => {
        const image = e.target.files[0];
        if(!image.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return
        }
        setImage(image);
    }

    const handleCreateGallery = e => {
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(image && (CheckBtn.current.context._errors.length === 0)){
            dispatch(createGallerie(title, description, fileDataURL))
            .then(() => {
                setLoading(false);
                navigate("/images_gallery");
                setTitle("");
                setDescription("");
                setImage(null);
                //window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        }else{
            setLoading(false);
        }
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (image) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(image);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
    }, [image]);

    return (
        <div className="col-md-12 form__image">
            <div className="card card-container form__container">
                <h2>Create Image Gallery</h2>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <Form onSubmit={handleCreateGallery} ref={form}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={onTitleChange}
                            validations={[required]}
                        />
                    </div>
                        
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Textarea
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <p>
                            <label htmlFor='image'> Browse images  </label>
                            <input
                                type="file"
                                id='image'
                                accept='.png, .jpg, .jpeg'
                                onChange={onChangeImage}
                                validations={[required]}
                            />
                        </p>
                        
                        {fileDataURL ?
                            <p className="img-preview-wrapper">
                                {
                                    <img src={fileDataURL} alt="preview" style={{width: "500px"}} />
                                }
                            </p> : null}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                        </button>
                    </div>
                    <CheckButton style={{ display: "none" }} ref={CheckBtn} />
                </Form>
            </div>
        </div>
    )
};

export default NewImageGallery;