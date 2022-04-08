import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa } from '../models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.scss']
})
export class ListaTarefasComponent implements OnInit {

  constructor(private service: TarefaService, private router: Router, private route: ActivatedRoute) { }
  tarefas: any[];
  tarefasConcluidas: any[];
  //Propriedades tarefas pendentes
  idxTarefaEditada: number;
  tarefaEditadaDescricao: string;
  dataEditada: Date;
  pendentes;
  display = 'none';
  //propriedades tarefas concluidas
  idxTarefaCdEditada: number;
  tarefaCdEditadaDescricao: string;
  dataEditadaCd: Date;
  concluidas;
  displayConcluidas = 'none'
  //datas
  data = new Date();

  //Abre a janela de edição das tarefas pendentes
  abrirJanelaEdicaoTarefa(index: number) {
    this.idxTarefaEditada = index;
    this.tarefaEditadaDescricao = this.tarefas[index].descricao;
    this.abrirJanelaEdicaoPendente();
  }

  //Abre a janela de edicao das tarefas concluidas
  abrirJanelaEdicaoTarefaConcluida(index: number) {
    this.idxTarefaCdEditada = index;
    this.tarefaCdEditadaDescricao = this.tarefasConcluidas[index].descricao;
    this.abrirJanelaEdicaoConcluida();
  }

  //Fecha a janela de edicao das tarefas pendentes
  fecharJanelaEdicaoTarefa() {
    this.fecharJanelaEdicaoPendente();
  }

  //Fecha a janela de edicao das tarefas concluidas
  fecharJanelaEdicaoTarefaConcluida() {
    this.fecharJanelaEdicaoConcluida();
  }

  //exclui a tarefa
  excluir(id: number) {
    this.service.excluirTarefa(id).subscribe(() => {
      (error) => {
        console.log(error)
      }
    });
    setTimeout(() => {
      this.atualizarPagina();
    }, 200);

  }

  //conclui a tarefa
  concluir(id: number) {
    this.service.concluirTarefa(id).subscribe(() => {
      (error) => {
        console.log(error)
      }
    });
    setTimeout(() => {
      this.atualizarPagina();
    }, 200);
  }

  //Deixa a tarefa como pendente
  deixarPendente(id: number) {
    this.service.deixarTarefaPendente(id).subscribe(() => {
      (error) => {
        console.log(error)
      }
    });
    setTimeout(() => {
      this.atualizarPagina();
    }, 200);
  }


  //Atualiza as tarefas pendentes
  atualizarTarefaPendente() {
    var tarefa = this.tarefas[this.idxTarefaEditada];
    tarefa.descricao = this.tarefaEditadaDescricao;
    if(this.dataEditada == undefined) {
      tarefa.data = tarefa.data;
    } else {
      tarefa.data = this.dataEditada;
    }
    this.service.atualizaTarefa(tarefa, tarefa.id).subscribe(() => {
      (error) => {
        console.log(error);
      }
    })
    setTimeout(() => {
      this.atualizarPagina();
    }, 200);
  }

  //Atualiza as tarefas concluidas
  atualizarTarefaConcluida() {
    var tarefa = this.tarefasConcluidas[this.idxTarefaCdEditada];
    tarefa.descricao = this.tarefaCdEditadaDescricao;
    if(this.dataEditadaCd == undefined) {
      tarefa.data = tarefa.data;
    } else {
      tarefa.data = this.dataEditadaCd;
    }
    this.service.atualizaTarefa(tarefa, tarefa.id).subscribe(() => {
      (error) => {
        console.log(error);
      }
    })
    setTimeout(() => {
      this.atualizarPagina();
    }, 200);
  }

  //Atualiza a página
  atualizarPagina() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }


  //Abre a jenela de edição das tarefas pendentes
  abrirJanelaEdicaoPendente() {
    this.display = 'block'
  }

  //Abre a jenela de edição das tarefas concluidas
  abrirJanelaEdicaoConcluida() {
    this.displayConcluidas = 'block'
  }

  //Fecha a janela de edicão das tarefas pendents
  fecharJanelaEdicaoPendente() {
    this.display = 'none';
  }

  //Fecha a janela de edicão das tarefas concluidas
  fecharJanelaEdicaoConcluida() {
    this.displayConcluidas = 'none';
  }

  ngOnInit(): void {
    //recupera as tarefas ao iniciar o componente
    this.service.recuperarTarefas().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
      this.pendentes = this.tarefas.length;
    })

    //recupera as tarefas pendentes ao iniciar o componente
    this.service.recuperarTarefasConcluidas().subscribe((tarefas: Tarefa[]) => {
      this.tarefasConcluidas = tarefas;
      this.concluidas = this.tarefasConcluidas.length;
    })
  }

}
