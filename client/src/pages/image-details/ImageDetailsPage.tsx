import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import './ImageDetailsPage.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Photo } from "../../models/Photo.ts";
import { PhotoResponse } from "../../models/PhotoResponse.ts";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../../utils/constants.ts";

function ImageDetailsPage() {

    const navigate = useNavigate()
    const params = useParams();
    const [photo, setPhoto] = useState<Photo | undefined>(undefined);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);

    const handleTitle = (e: any) => setTitle(e.target.value);
    const handleDescription = (e: any) => setDescription(e.target.value);

    const updatePhoto = async (event: any) => {
        event.preventDefault()

        const rawResponse = await fetch(`${API_URL}/photo/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title || photo?.title,
                description: description || photo?.description,
            })
        });

        const response: PhotoResponse = await rawResponse.json();
        if (response.success) {
            setPhoto(response.photo)
            navigate('/')
        }
    }

    const deletePhoto = async (event: any) => {
        event.preventDefault()

        const rawResponse = await fetch(`${API_URL}/photo/${params.id}`, {
            method: "DELETE",
            body: JSON.stringify({ title, description })
        });

        const response: PhotoResponse = await rawResponse.json();
        if (response.success) {
            navigate('/')
        }
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            const rawResponse = await fetch(`${API_URL}/photo/${params.id}`);
            const response: PhotoResponse = await rawResponse.json();
            if (response.success) {
                setPhoto(response.photo)

                setTitle(response.photo.title)
                setDescription(response.photo.description)
            }
        }

        fetchPhotos()
    }, [])

    return (
        <Container>
            <div className="d-flex">
                <div className="me-5">
                    {photo ? (<img className="w-100 rounded-3" src={photo.url} alt={photo.title}/>) : "Image not found"}
                </div>
                <div className="w-50">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control placeholder="Title" value={title} onChange={handleTitle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control as="textarea"
                                          rows={5}
                                          placeholder="Description"
                                          value={description}
                                          onChange={handleDescription}/>
                        </Form.Group>

                        <Button className="w-100" variant="primary" type="submit" onClick={updatePhoto}>Update</Button>
                    </Form>

                    <Button className="w-100 mt-3" variant="danger" type="submit" onClick={deletePhoto}>Delete</Button>
                </div>
            </div>

        </Container>
    );
}


export default ImageDetailsPage;