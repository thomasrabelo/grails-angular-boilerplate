import {Component, OnDestroy, OnInit} from '@angular/core';
import {PacienteService} from "../paciente.service";
import {Subject, takeUntil} from "rxjs";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Paciente} from "../paciente";

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})

export class PacienteListComponent implements OnInit, OnDestroy {

  isLoading = false;
  totalItems = 0;
  itemsPerPage = 5;
  page: number = 0;
  predicate!: string;
  ascending!: boolean;
  listOfPacientes: Paciente[] = [];

  protected readonly unsubscribe$ = new Subject<void>();


  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    // this.pacienteService.list({
    //   page: this.page - 1,
    //   size: this.itemsPerPage,
    //   sort: this.sort(),
    // })
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(pacientes => {
    //     pacientes.forEach(p => console.log(p));
    //   });
    //
    // this.pacienteService.get(3)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(paciente => {
    //     console.log(paciente.nome);
    //   });

    this.loadDataFromServer(0, this.itemsPerPage);

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number
  ): void {

    pageIndex = pageIndex === undefined ? this.page : pageIndex;
    pageSize = pageSize === undefined ? this.itemsPerPage : pageSize;

    this.isLoading = true;
    this.pacienteService.list({
      offset: pageIndex,
      max: pageSize
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(pacienteResultList => {
        this.isLoading = false;
        this.totalItems = pacienteResultList.totalCount;
        this.listOfPacientes = pacienteResultList.resultList;
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;


    this.loadDataFromServer(pageIndex, pageSize);
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? 'asc' : 'des'}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

}
