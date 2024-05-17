import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import './ImageDetailsPage.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "../../models/Photo.ts";
import { PhotoResponse } from "../../models/PhotoResponse.ts";
import { Button, Form } from "react-bootstrap";
import { API_URL } from "../../utils/constants.ts";

function ImageDetailsPage() {

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
            body: JSON.stringify({ title, description })
        });

        const response: PhotoResponse = await rawResponse.json();
        if (response.success) {
            setPhoto(response.photo)
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
        }
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            const rawResponse = await fetch(`${API_URL}/photo/${params.id}`);
            const response: PhotoResponse = await rawResponse.json();
            if (response.success) {
                setPhoto(response.photo)
            }
        }

        fetchPhotos()
    }, [])

    return (
        <Container>
            <div className="d-flex">
                <div className="me-5">
                    {photo ? (<img src={photo.url} alt={photo.title}/>) : "Image not found"}
                </div>
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Update Title</Form.Label>
                            <Form.Control placeholder="Title" value={title} onChange={handleTitle}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Update Description</Form.Label>
                            <Form.Control placeholder="Description" value={description} onChange={handleDescription}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={updatePhoto}>Update</Button>
                    </Form>

                    <Button className="mt-3" variant="danger" type="submit" onClick={deletePhoto}>Delete</Button>
                </div>
            </div>

        </Container>
    );
}


export default ImageDetailsPage;