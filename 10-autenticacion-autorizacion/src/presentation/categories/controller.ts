import { Response, Request } from 'express';
import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain';
import { CategoryService } from '../services/category.service';


export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {

    }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log({ error });
        return res.status(500).json({ error: "Internal server error" });
    }


    public getCategory = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [error, dto] = PaginationDto.create(+page, +limit);

        if (error) return res.status(400).json({ error });

        this.categoryService.getCategories(dto! as PaginationDto)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    }

    public newCategory = (req: Request, res: Response) => {

        const [error, dto] = CreateCategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.categoryService.createCategory(dto!, req.body.user)
            .then(data => res.status(201).json(data))
            .catch(err => this.handleError(err, res));
    }
}