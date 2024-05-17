import express, { raw } from 'express';
import cors from 'cors';
import { ACCOUNT_ID, API_KEY } from "./constants.js";
import { PhotoCloudFlareResponse, PhotosCloudFlareResponse } from "./models";
import { mapToPhoto } from "./utils/mapToPhoto.js";

const app = express();
app.use(express.json({type: '*/*'}));
app.use(cors());

const port = 3050;

type Product = { name: string, price: number, type: string }

app.get('/photos', async (req, res) => {
    const rawResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });

    const photosResponse: PhotosCloudFlareResponse = await rawResponse.json();
    res.send({
        success: photosResponse.success,
        photos: photosResponse.result.images.map(mapToPhoto)
    });
});

app.get('/photo/:id', async (req, res) => {
    const rawResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${req.params.id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    });

    const photoResponse: PhotoCloudFlareResponse = await rawResponse.json();
    res.send({
        success: photoResponse.success,
        photo: mapToPhoto(photoResponse.result)
    });
});

app.post('/photo', async (req, res) => {
    // TODO
    res.send([]);
});

app.put('/photo/:id', async (req, res) => {
    const body: { title?: string, description?: string } = req.body;

    const rawResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${req.params.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            metadata: {
                title: body.title,
                description: body.description
            }
        })
    });

    const photoResponse: PhotoCloudFlareResponse = await rawResponse.json();
    res.send({
        success: photoResponse.success,
        photo: mapToPhoto(photoResponse.result)
    });
});

app.delete('/photo/:id', async (req, res) => {
    const rawResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${req.params.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_KEY}` }
    });

    const response: { success: boolean } = await rawResponse.json();

    res.send({ success: response?.success });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
