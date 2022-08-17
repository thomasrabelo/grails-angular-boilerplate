import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../patient.service";
import {BloodGroup, Gender, Patient} from "../patient.model";
import {Subject, takeUntil} from "rxjs";
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientEditComponent implements OnInit, OnDestroy {
  @Input() patientId?: number;

  isConfirmLoading = false;
  errors: any[];
  patientForm!: FormGroup;

  bloodGroupEnum = BloodGroup;
  genderEnum = Gender;

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private patientService: PatientService, private changeDetector: ChangeDetectorRef,
              private router: Router, private modal: NzModalRef) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(){
    if (this.patientId) {
      this.patientService.get(this.patientId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((patient) => {
          this.patientForm.setValue({
            id: patient.id ? patient.id : '',
            name: patient.name ? patient.name : '',
            gender: patient.gender ? patient.gender : '',
            dob: patient.dob ? patient.dob : '',
            bloodGroup: patient.bloodGroup ? patient.bloodGroup : '',
            mobileNumber: patient.mobileNumber ? patient.mobileNumber : '',
            email: patient.email ? patient.email : '',
            symptoms: patient.symptoms ? patient.symptoms : ''
          });
        });
    }
  }

  initForm() {
    this.patientForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      bloodGroup: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      symptoms: [null]
    });
  }

  save() {
    if (this.patientForm.valid) {
      this.isConfirmLoading = true;
      this.patientService.save(this.patientForm.value).subscribe(
        (patient) => {
          this.modal.destroy();
        },
        (res: Response) => {
          this.isConfirmLoading = false;
          const json = res.json();
          if (json.hasOwnProperty('message')) {
            this.errors = [json];
          } else {
            this.errors = [json];
          }
        });
    } else {
      Object.values(this.patientForm.controls).forEach(control => {
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
}
