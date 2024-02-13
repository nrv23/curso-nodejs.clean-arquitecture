

export class PaginationDto {


    private constructor(
        public readonly page: number = 1,
        public readonly limit: number = 1,
    ) { }


    static create(page: number = 1, limit: number = 10) {

        if (isNaN(page) || isNaN(limit)) return ["Page and Limit must be numbers", undefined];
        if (page < 1) return ["page must be greater than 0", undefined];
        if (limit < 1) return ["limit must be greater than 0", undefined];

        return [undefined, new PaginationDto(page, limit)];
    }
}