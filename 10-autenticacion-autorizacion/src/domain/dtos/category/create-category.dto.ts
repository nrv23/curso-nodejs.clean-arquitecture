

export class CreateCategoryDto {

    private constructor(

        public readonly name: string,
        public readonly available: boolean
    ) {

    }


    static create(obj: { [key: string]: any }): [string?, CreateCategoryDto?] {

        const { name, available = false } = obj;

        let newAvailable = available;

        if (!name) return ["El nombre del producto es requerido", undefined];
        if (name.length < 10) ["El producto debe tener un nombre con un tamaño de al menos 10 caracteres", undefined];
        if (available && typeof available !== "boolean") {
            newAvailable = available === "true" ? true : false;
        }

        return [undefined, new CreateCategoryDto(name, newAvailable)];
    }
}