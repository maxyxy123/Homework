import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly products;
    constructor(products: ProductsService);
    status(): {
        logger: string;
        database: string;
    };
}
