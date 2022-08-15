import { Component, OnInit } from '@angular/core';
import {Patient} from "../../patient/patient.model";
import {Subject, takeUntil} from "rxjs";
import {PatientService} from "../../patient/patient.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {DoctorService} from "../doctor.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {PatientEditComponent} from "../../patient/patient-edit/patient-edit.component";
import {DoctorEditComponent} from "../doctor-edit/doctor-edit.component";
import {Doctor, Specialization} from "../doctor.model";
import {DoctorShowComponent} from "../doctor-show/doctor-show.component";
import {Router} from "@angular/router";
import {SpecializationService} from "../specialization.service";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  totalItems:number = 0;
  itemsPerPage:number = 10;
  page: number = 0;
  sortField: string = 'id';
  sortOrder: string = 'asc';
  listOfDoctors: Doctor[] = [];
  isLoadingListOfDoctors: boolean = false;
  listOfSpecializations: Specialization[] = [];
  isLoadingListOfSpecializations: boolean = false;
  fallback =
    'data:image/png;base64,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';


  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private doctorService: DoctorService,
              private specializationService: SpecializationService,
              private modalService: NzModalService,
              private messageService: NzMessageService, private router: Router) { }


  ngOnInit(): void {
    this.loadSpecializations();
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

    this.isLoadingListOfDoctors = true;
    this.doctorService.list(offset, max, sort, order)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(doctorResultList => {
        this.isLoadingListOfDoctors = false;
        this.totalItems = doctorResultList.totalCount;
        this.listOfDoctors = doctorResultList.resultList;
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
        this.isLoadingListOfDoctors = true;

        this.doctorService.delete(id).subscribe(res => {
            this.messageService.info('Doctor:' + JSON.stringify(id))
            this.isLoadingListOfDoctors = false;
            this.loadDataFromServer(this.page, this.itemsPerPage)
          },
          error => this.isLoadingListOfDoctors = false
        );
      }
    });
  }

  edit(id: number): void {
    this.modalService.create({
      nzTitle: 'Edit Doctor',
      nzContent: DoctorEditComponent,
      nzComponentParams: {
        // doctorId: id
      }
    }).afterClose.subscribe(result => {
      this.loadDataFromServer(this.page, this.itemsPerPage);
    });
  }

  createNewDoctor(): void {
    this.modalService.create({
      nzTitle: 'Create New Doctor',
      nzContent: DoctorEditComponent
    });
  }

  onPageIndexChange($event: number): void {
    this.loadDataFromServer($event, this.itemsPerPage);
  }

  onPageSizeChange($event: number): void {
    this.loadDataFromServer(this.page, $event);
  }

  show(id: number): void {
    this.router.navigate(['/doctor/show', id]);
  }

  loadSpecializations() {
    this.isLoadingListOfSpecializations = true;
    this.specializationService.list(0, 1000, 'name', 'asc')
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(specializationResultList => {
        this.isLoadingListOfSpecializations = false;
        this.listOfSpecializations = specializationResultList.resultList;
      })
  }
}
