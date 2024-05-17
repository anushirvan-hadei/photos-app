import { Photo } from "./Photo.ts";

export type PhotosResponse = {
    success: boolean;
    photos: Photo[];
}