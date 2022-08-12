import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {PatientService} from "../patient.service";
import {Patient} from "../patient.model";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {

  isLoading = false;
  totalItems = 0;
  itemsPerPage = 5;
  page: number = 0;
  sortField: string = 'id';
  sortOrder: string = 'asc';
  listOfPatients: Patient[] = [];

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private patientService: PatientService,
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
    const sort = sortField === null ? this.sortField : sortField;
    const order = sortOrder === null ? this.sortOrder : sortOrder === 'ascend' ?
      'asc' : sortOrder === 'descend' ? 'desc' : this.sortOrder;

    this.isLoading = true;
    this.patientService.list(offset, max, sort, order)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(patientResultList => {
        this.isLoading = false;
        this.totalItems = patientResultList.totalCount;
        this.listOfPatients = patientResultList.resultList;
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
      nzContent: 'Deseja excluir o patient?',
      nzOnOk: () => {
        this.isLoading = true;

        this.patientService.delete(id).subscribe(res => {
            this.messageService.info('Patient:' + JSON.stringify(id))
            this.isLoading = false;
            this.loadDataFromServer(this.page, this.itemsPerPage)
          },
          error => this.isLoading = false
        );
      }
    });
  }

  // edit(id: number): void {
  //   this.modalService.create({
  //     nzTitle: 'Modal Title',
  //     nzContent: PatientEditComponent
  //   });
  // }

}
