import { Product } from "./product";

export interface Event {
    id?: string,
    uuid?: string,
    title: string;
    date: string,
    description: string,
    image: string,
    status?: string,
}