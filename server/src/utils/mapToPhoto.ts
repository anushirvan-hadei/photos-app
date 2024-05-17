
import { Photo } from "../models/Photo";
import { PhotoResource } from "../models";

export const mapToPhoto = (photo: PhotoResource): Photo => {
    return {
        id: photo.id,
        title: photo.meta?.title,
        description: photo.meta?.description,
        url: photo.variants[0]!!
    }
}