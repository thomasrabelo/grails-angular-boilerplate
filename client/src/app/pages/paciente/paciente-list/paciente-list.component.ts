import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {PacienteService} from "../paciente.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {Paciente} from "../paciente.model";

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
  sortField: string = 'id';
  sortOrder: string = 'asc';
  listOfPacientes: Paciente[] = [];

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private pacienteService: PacienteService,
              private modalService: NzModalService,
              private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.loadDataFromServer(0, this.itemsPerPage);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: string
  ): void {

    const offset = pageIndex === undefined ? this.page : (pageIndex - 1) * pageSize;
    const max = pageSize === undefined ? this.itemsPerPage : pageSize;
    const sort = sortField === null ? this.sortField : sortField;;
    const order = sortOrder === null ? this.sortOrder : sortOrder === 'ascend' ?
      'asc' : sortOrder === 'descend' ? 'desc' : this.sortOrder;

    this.isLoading = true;
    this.pacienteService.list(offset, max, sort, order)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(pacienteResultList => {
        this.isLoading = false;
        this.totalItems = pacienteResultList.totalCount;
        this.listOfPacientes = pacienteResultList.resultList;
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    let sortOrder = (currentSort && currentSort.value) || null;

    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder);
  }

  delete(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirmar exclusão',
      nzContent: 'Deseja excluir o paciente?',
      nzOnOk: () => {
        this.isLoading = true;

        this.pacienteService.destroy(id).subscribe(res => {
            this.messageService.info('Paciente:' + JSON.stringify(id))
            this.isLoading = false;
            this.loadDataFromServer(this.page, this.itemsPerPage)
          },
            error => this.isLoading = false
        );
      }
    });
  }

}
