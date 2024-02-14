import { Validators } from "../../../config";

export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly userId: string,
        public readonly categoryId: string
    ) { }

    static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, available = false, price, description, userId, categoryId } = obj;

        let newAvailable = available;

        if (!name) return ["missing name", undefined];
        if (available && typeof available !== "boolean") {
            newAvailable = available === "true" ? true : false;
        }

        if (!price) return ["Missing price", undefined];
        if (price < 1) return ["Price must be at least 1", undefined];
        if (isNaN(+price)) return ["Price must be a number", undefined];

        if (!userId) return ["Missing userId", undefined];
        if (!Validators.isMongoId(userId)) return ["Inavalid UserId", undefined];

        if (!categoryId) return ["Missing categoryId", undefined];
        if (!Validators.isMongoId(categoryId)) return ["Inavalid CategoryId", undefined];


        return [
            undefined,
            new CreateProductDto(name, newAvailable, price, description, userId, categoryId),
        ];
    }
}
