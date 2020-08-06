// TODO: Add orderDate

export interface IOrder {
    id: number;
    customerId: number;
    firstName: string;
    notes?: string;
    orderItems: IOrderItem[];
}

// TODO: id, productId, productCode, productName, productPrice, quantity

export interface IOrderItem {
    id: number;
    firstName: string;
    notes?: string;
}
