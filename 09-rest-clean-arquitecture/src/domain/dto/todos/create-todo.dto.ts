

export class CreateTodoDTO {

    private constructor(public readonly text: string) { // cuando el constructor es privado solo se puede llamar dentro
        // de la misma clase
        this.text = text;
    }

    static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {

        const { text } = props;

        if (!text) return ["El valor para text es requerido", undefined];


        return [undefined, new CreateTodoDTO(text)];
    }
}