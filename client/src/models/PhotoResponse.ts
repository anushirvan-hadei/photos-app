import { Photo } from "./Photo.ts";

export type PhotoResponse = {
    success: boolean;
    photo: Photo;
}