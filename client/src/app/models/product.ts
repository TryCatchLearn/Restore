export interface Product {
    id: number,
    name: string,
    description: string,
    pictureUrl: string,
    price: number,
    brand: string,
    type?: string,
    quantityInStock?: number
}
