import { DiscountType } from '../../../enums';
import { InvoiceItemDto } from './invoice-item.dto';
export declare class CreateInvoiceDto {
    patientId: string;
    doctorId: string;
    items: InvoiceItemDto[];
    discount?: number;
    discountType?: DiscountType;
    paid?: number;
    paymentMethod?: string;
    currency?: string;
    dueDate?: string;
}
