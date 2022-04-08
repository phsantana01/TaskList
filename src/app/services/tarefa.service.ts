import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  listaDeTarefas: any[];
  private url = 'https://localhost:5001/tarefa';

  constructor(private httpClient: HttpClient) {
    this.listaDeTarefas = [];
  }

  public recuperarTarefas() {
    return this.httpClient.get(`${this.url}/recuperarTarefas`);
  }

  public recuperarTarefasConcluidas() {
    return this.httpClient.get(`${this.url}/recuperarTarefasConcluidas`);
  }

  public registrarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(`${this.url}/registrarTarefa`, tarefa);
  }

  public excluirTarefa(id: Number) {
    return this.httpClient.delete(`${this.url}/excluirTarefa/${id}`);
  }

  public concluirTarefa(id: Number) {
    return this.httpClient.put(`${this.url}/concluirTarefa/${id}`, id);
  }

  public deixarTarefaPendente(id: Number) {
    return this.httpClient.put(`${this.url}/deixarPendente/${id}`, id);
  }

  public atualizaTarefa(tarefa: Tarefa, id: Number) {
    return this.httpClient.put(`${this.url}/atualizarTarefa/${id}`, tarefa);
  }

}
