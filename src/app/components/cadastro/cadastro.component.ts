import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public cadastroForm!: FormGroup;

  cabecalho = 'Cadastro';
  etiqueta = 'Registre-se com seu nome, e-mail e senha';
  botao = 'Cadastre-se';

  caminho = '/login'
  retorno = 'já tem conta? Faça o login'

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.atualizar();
  }

  cadastrar() {

    const USUARIO: Usuario = {
      name: this.cadastroForm.get('name')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value
    }

    if (this.id != null) {
      this._usuarioService.patchUsuario(this.id, USUARIO).subscribe(data => {
        this.toastr.success('O usuário foi editado com êxito', 'Usuário atualizado!');
        this.router.navigate(['/lista']);
      }, err => {
        console.log(err);
        this.toastr.error('Ocorreu um erro ao editar o usuário', 'ERRO');
        this.cadastroForm.reset();
      })
    } else {
      this._usuarioService.postUsuario(USUARIO).subscribe(data => {
        this.toastr.success('Sua conta foi criada com êxito', 'Cadastro Realizado!');
        this.router.navigate(['login']);
      }, err => {
        console.log('Ocorreu um erro ao criar o usuário', err);
        this.cadastroForm.reset();
      })
    }
  }

  atualizar() {
    if (this.id != null) {
      this.cabecalho = 'Editar usuário';
      this.etiqueta = 'Atualizar seu nome, e-mail ou senha'
      this.botao = 'Editar';
      this.caminho = '/lista'
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        this.cadastroForm.setValue({
          name: data.name,
          email: data.email,
          senha: data.senha,
        })
      })
    }
  }

}
