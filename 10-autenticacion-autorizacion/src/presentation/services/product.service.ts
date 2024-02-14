import { CreateProductDto } from './../../domain/dtos/product/create-product.dto';
import { CustomError } from '../../domain';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
import { ProductModel } from '../../data/mongo/models/product.model';


export class ProductService {

    constructor() { }

    public createProduct = async (dto: CreateProductDto) => {

        try {

            const exist = await ProductModel.findOne({
                name: dto.name
            });

            if (exist) throw CustomError.BadRequest("El producto fue agregado anteriormente");

            const newProduct = new ProductModel(dto);
            await newProduct.save();
            return newProduct;

        } catch (error) {
            throw CustomError.InternalError("Internal Server Error");
        }
    }


    public getProducts = async (dto: PaginationDto) => {

        try {

            const { page, limit } = dto;
            const [count, products] = await Promise.all(
                [
                    ProductModel.countDocuments(),
                    ProductModel.find()
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .populate('userId', 'name email email emailValidated role')
                        .populate('categoryId', 'name ')
                    // populate con la categoria
                ]
            )

            return {
                page,
                limit,
                total: count,
                products
            };

        } catch (error) {
            console.log({ error });
            throw CustomError.InternalError("Internal Server Error");
        }
    }
}