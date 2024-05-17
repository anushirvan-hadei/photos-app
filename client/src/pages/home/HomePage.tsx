import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HomePage.css'
import { useEffect, useState } from "react";
import { PhotosResponse } from "../../models/PhotosResponse.ts";
import { Photo } from "../../models/Photo.ts";
import { Image } from "../../components/Image.tsx";
import { API_URL } from "../../utils/constants.ts";

function HomePage() {

    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const rawResponse = await fetch(`${API_URL}/photos`);
            const response: PhotosResponse = await rawResponse.json();
            if (response.success) {
                setPhotos(response.photos)
            }
        }

        fetchPhotos()
    }, [])

    return (
        <Container>
            <Row>
                {
                    photos.map((photo) => {
                        return (
                            <Col sm={4}>
                                <Image key={photo.id} photo={photo}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
}


export default HomePage;