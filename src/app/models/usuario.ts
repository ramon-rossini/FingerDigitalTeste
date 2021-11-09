// Modelo com a classe Usuario para o armazenamento e manipulação dos dados

export class Usuario {
    _id?: number;
    name: string;
    email: string;
    senha: string;

    constructor(name: string, email: string, senha: string) {
        this.name = name;
        this.email = email;
        this.senha = senha;
    }
}