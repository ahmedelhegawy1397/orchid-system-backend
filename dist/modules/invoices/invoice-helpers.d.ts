import { DiscountType, InvoiceStatus, PaymentMethod } from '../../enums';
export declare function computeStatus(paid: number, total: number): InvoiceStatus;
export declare function applyDiscount(subtotal: number, discount: number, type: DiscountType): number;
export declare function normalizeMethod(m: string): PaymentMethod;
