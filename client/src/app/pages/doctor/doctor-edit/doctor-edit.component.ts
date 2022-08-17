import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Gender} from "../../doctor/doctor.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NzModalRef} from "ng-zorro-antd/modal";
import {DoctorService} from "../doctor.service";
import {Department, Doctor, Specialization} from "../doctor.model";
import {SpecializationService} from "../specialization.service";
import {DepartmentService} from "../department.service";

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorEditComponent implements OnInit, OnDestroy {
  @Input() doctorId?: number;

  isConfirmLoading: boolean = false;
  doctorForm!: FormGroup;
  genderEnum = Gender;

  isLoadingListOfSpecializations: boolean = false;
  listOfSpecializations: Specialization[] = [];

  isLoadingListOfDepartments: boolean = false;
  listOfDepartments: Department[] = [];

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private doctorService: DoctorService,
              private specializationService: SpecializationService, private departmentService: DepartmentService,
              private changeDetector: ChangeDetectorRef,
              private router: Router, private modal: NzModalRef) {}

  ngOnInit() {
    this.loadDepartments();
    this.loadSpecializations();
    this.loadData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(){
    if (this.doctorId) {
      this.doctorService.get(this.doctorId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((doctor) => {
          this.doctorForm.setValue({
            id: doctor.id ? doctor.id : '',
            name: doctor.name ? doctor.name : '',
            gender: doctor.gender ? doctor.gender : '',
            mobileNumber: doctor.mobileNumber ? doctor.mobileNumber : '',
            email: doctor.email ? doctor.email : '',
            education: doctor.education ? doctor.education : '',
            experience: doctor.experience ? doctor.experience : '',
            designation: doctor.designation ? doctor.designation : '',
            specialization: doctor.specialization ? doctor.specialization as Specialization : '',
            department: doctor.department ? doctor.department as Department : ''
          });
          this.changeDetector.detectChanges();
        });
    }
  }

  initForm() {
    this.doctorForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      education: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      specialization: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
  }

  save() {
    if (this.doctorForm.valid) {
      this.isConfirmLoading = true;
      this.doctorService.save(this.doctorForm.value).subscribe((doctor) => {
        this.modal.destroy();
        this.isConfirmLoading = false;
      }, (res: Response) => {
        const json = res.json();
        if (json.hasOwnProperty('message')) {
          //this.errors = [json];
        } else {
          //this.errors = json._embedded.errors;
        }
      });

    } else {
      Object.values(this.doctorForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modal.destroy();
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
        this.changeDetector.detectChanges();
      })
  }

  loadDepartments() {
    this.isLoadingListOfDepartments = true;
    this.departmentService.list(0, 1000, 'name', 'asc')
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(departmentResultList => {
        this.isLoadingListOfDepartments = false;
        this.listOfDepartments = departmentResultList.resultList;
        this.changeDetector.detectChanges();
      })
  }
}
