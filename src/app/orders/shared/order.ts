// TODO: Add orderDate

export interface IOrder {
    id: number;
    customerId: number;
    orderItems: IOrderItem[];
}

// TODO: id, productId, productCode, productName, productPrice, quantity

export interface IOrderItem {
    id: number;
    productId: number;
    quantity: number;
}
