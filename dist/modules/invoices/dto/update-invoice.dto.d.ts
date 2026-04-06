import { InvoiceItemDto } from './invoice-item.dto';
import { DiscountType } from '../../../enums';
export declare class UpdateInvoiceDto {
    items?: InvoiceItemDto[];
    discount?: number;
    discountType?: DiscountType;
}
