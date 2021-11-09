import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private toast: ToastrService,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.http.get<any>(environment.apiURL).subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.senha === this.loginForm.value.senha
      });
      if (user) {
        this.toast.success('Bem Vindo Finger Digital 2021', 'Login efetuado!');
        this.loginForm.reset();
        this.router.navigate(['lista'])
      } else {
        this.toast.error('O usuário não foi encontrado', 'Não existe!');
      }
    }, err => {
      this.toast.error('Ocorreu um erro ao efetuar o login', 'ERRO!');
    })
  }

}
