import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {DoctorService} from "../doctor.service";
import {Doctor} from "../doctor.model";
import {DoctorEditComponent} from "../doctor-edit/doctor-edit.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-doctor-show',
  templateUrl: './doctor-show.component.html',
  styleUrls: ['./doctor-show.component.css']
})
export class DoctorShowComponent implements OnInit, OnDestroy {
  doctor?: Doctor;
  isLoading: boolean = false;

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private doctorService: DoctorService, private route: ActivatedRoute,
              private router: Router, private modalService: NzModalService, private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(){
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.doctorService.get(params['id'])
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((doctor) => {
            this.doctor = doctor;
          });
      }
    });
  }

  delete(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirmar exclusão',
      nzContent: 'Deseja excluir o doctor?',
      nzOnOk: () => {
        this.isLoading = true;
        this.doctorService.delete(id).subscribe(res => {
            this.messageService.info('Doctor:' + JSON.stringify(id))
            this.isLoading = false;
            this.router.navigate(['/doctor']);
          },
          error => this.isLoading = false
        );
      }
    });
  }

  edit(id: number): void {
    this.modalService.create({
      nzTitle: 'Edit Doctor',
      nzContent: DoctorEditComponent,
      nzComponentParams: {
        doctorId: id
      }
    }).afterClose.subscribe(result => {
      this.loadData();
    });
  }

  onBack() {
    this.router.navigate(['/doctor']);
  }
}
