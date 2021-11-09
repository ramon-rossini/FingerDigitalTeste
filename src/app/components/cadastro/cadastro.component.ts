import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  cadastrar() {
    const USUARIO: Usuario = {
      nome: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value
    }

    console.log(USUARIO);

    this.toastr.success('Sua conta foi criada com êxito', 'Cadastro Realizado!');

    this.router.navigate(['login']);
  }

}
