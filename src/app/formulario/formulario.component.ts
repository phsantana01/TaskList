import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa } from '../models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  constructor(private service: TarefaService, private router: Router, private route: ActivatedRoute) { }
  tarefa: string;
  data: Date;

  adicionarTarefa() {
    const tarefaAAdicionar: Tarefa = { descricao: this.tarefa, data: this.data };
    this.service.registrarTarefa(tarefaAAdicionar).subscribe(() => {
      this.limparCampos();
      setTimeout(() => {
        this.atualizarPagina();
      }, 200);
    },
      (error) => {
        console.log(error);
      }
    )

  }

  limparCampos() {
    this.tarefa = "";
    this.data = undefined;
  }

  atualizarPagina() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }

  ngOnInit(): void {
  }

}
