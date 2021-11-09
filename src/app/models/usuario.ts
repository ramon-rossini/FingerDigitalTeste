// Modelo com a classe Usuario para o armazenamento e manipulação dos dados

export class Usuario {
    id?: number;
    nome: string;
    email: string;
    senha: string;

    constructor(nome: string, email: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}