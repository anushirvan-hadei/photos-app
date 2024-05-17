import { PhotoResource } from "./PhotoResource";

export type PhotosCloudFlareResponse = {
    result: {
        images: PhotoResource[]
    },
    success: boolean
}