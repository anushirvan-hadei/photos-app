import { Photo } from "../models/Photo.ts";

export const Image = (props: { photo: Photo }) => {
    const photoPath = `/${props.photo.id}`;

    return (
        <a href={photoPath}>
            <div className="d-flex flex-column mb-4 rounded-3 bg-white">
                <img className="w-100 mb-2 rounded-top-3" style={{backgroundSize: "cover" }} src={props.photo.url} alt={props.photo.title}/>

                <div className="d-flex flex-column p-2">
                    <strong>{props.photo.title}</strong>
                    <span className="small">{props.photo.description}</span>
                </div>
            </div>

        </a>
    )
}