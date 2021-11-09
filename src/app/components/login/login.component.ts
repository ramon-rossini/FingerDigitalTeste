import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder
    ) {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        senha: ['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  fazerLogin() {
    console.log(this.loginForm.value);
    this.toast.success('Bem Vindo Finger Digital 2021', 'Login efetuado!');
  }

}
