export type PhotoResource = {
    id: string;
    filename: string;
    meta?: {
        title: string,
        description: string
    }
    uploaded: Date;
    variants: string[];
};