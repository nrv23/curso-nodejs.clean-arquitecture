import { CategoryModel } from './../../data/mongo/models/category.model';
import { CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from './../../domain/dtos/category/create-category.dto';


export class CategoryService {


    constructor() { }


    async createCategory(dto: CreateCategoryDto, user: UserEntity) {

        const categoryExist = await CategoryModel.findOne({
            name: dto.name
        });

        if (categoryExist) throw CustomError.BadRequest("Category already exist");

        try {

            const newCategory = await CategoryModel.create({
                ...dto,
                userId: user.id
            });

            return {
                id: newCategory.id,
                name: newCategory.name,
                available: newCategory.available,
            }

        } catch (error) {

            console.log({ error });
            throw CustomError.InternalError("Internal Server Error");
        }
    }

    async getCategories(paginationDto: PaginationDto) {

        try {

            const { page, limit } = paginationDto;
            const [count, categories] = await Promise.all(
                [
                    CategoryModel.countDocuments(),
                    CategoryModel.find()
                        .skip((page - 1) * limit)
                        .limit(limit)
                ]
            )

            return {
                page,
                limit,
                total: count,
                categories: categories.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    available: cat.available,
                }))
            };

        } catch (error) {
            console.log({ error });
            throw CustomError.InternalError();
        }
    }

}