import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { ProductService } from '../services/product.service';



export class ProductController {

    constructor(

        private readonly productService: ProductService
    ) { }

    private handleError = (error: unknown, res: Response) => {

        console.log({ error });

        if (error instanceof CustomError) {
            console.log("Es instancia de CustomError")
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log("no Es instancia de CustomError")
        return res.status(500).json({ error: "Internal server error" });
    }

    public createProduct = (req: Request, res: Response) => {

        const [error, dto] = CreateProductDto.create({
            ...req.body,
            userId: req.body.user.id
        });
        if (error) return res.status(400).json({ error });

        this.productService.createProduct(dto!)
            .then(response => {
                return res.status(201).json(response);
            })
            .catch(err => this.handleError(err, res));
    }

    public getProducts = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, dto] = PaginationDto.create(+page, +limit);

        if (error) return res.status(400).json({ error });

        this.productService.getProducts(dto! as PaginationDto)
            .then(response => res.json(response))
            .catch(err => this.handleError(err, res));

    }
}