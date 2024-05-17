import { Photo } from "../models/Photo.ts";

export const Image = (props: { photo: Photo }) => {
    const photoPath = `/${props.photo.id}`;

    return (
        <a href={photoPath}>
            <div className="flex-column">
                <img className="w-100 mb-4" style={{backgroundSize: "cover" }} src={props.photo.url} alt={props.photo.title}/>
                <strong>{props.photo.title}</strong>
                <strong>{props.photo.description}</strong>
            </div>

        </a>
    )
}