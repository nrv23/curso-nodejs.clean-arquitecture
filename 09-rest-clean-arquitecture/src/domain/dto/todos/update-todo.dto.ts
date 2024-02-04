

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public  text?: string,
        public completedAt?: Date,

        ) {
        
    }

    get values() {

        const obj : {[key:string]:any} = { };

        if(this.text) obj.text = this.text;
        if(this.completedAt) obj.completedAt = this.completedAt;

        return obj;
    }


    static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { text,completedAt, id } = props;

        if(!id || isNaN(+id)) return ["id no es válido",undefined];

        if (!text) return ["El valor para text es requerido", undefined];

        if(completedAt) {
            const newCompletedAt = new Date(completedAt);

            if(newCompletedAt.toString() === "Invalid Date") // "Invalid Date" este es el error que retorna el new Date si el 
            // parametro string que se le pasa no es una fecha valida 
            {
                return ["CompletedAt debe ser una fecha válida", undefined]
            }
        }


        return [undefined, new UpdateTodoDto(id,text,completedAt)];
    }

}