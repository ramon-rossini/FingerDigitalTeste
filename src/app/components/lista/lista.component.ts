import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista: Usuario[] = [];

  constructor(
    private toast: ToastrService,
    private _usuariosService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.obterUsuarios();
  }

  obterUsuarios() {
    this._usuariosService.getUsuarios().subscribe(data => {
      console.log(data);
      this.lista = data;
    }, err => {
      console.log('Erro ao obter os usuários', err);
    })
  }

  excluirUsuario(id: any) {
    this._usuariosService.deleteUsuario(id).subscribe(data => {
      this.toast.success('O usuário foi excluído com êxito', 'Usuário excluído!');
      this.obterUsuarios();
    }, err => {
      this.toast.error('Ocorreu um erro ao excluir o usuário', 'ERRO');
    })
  }

}
