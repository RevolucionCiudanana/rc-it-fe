
export interface Product {
    id: number;
    cartProductId: string;
    uuid: string;
    name: string;
    price: number;
    quantity?: number;
}