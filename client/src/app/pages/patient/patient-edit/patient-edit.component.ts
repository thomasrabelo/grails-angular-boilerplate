import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../patient.service";
import {BloodGroup, Gender, Patient} from "../patient.model";
import {Subject, takeUntil} from "rxjs";
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit, OnDestroy {
  @Input() patientId?: number;

  isConfirmLoading = false;
  errors: any[];
  patient: Patient = new Patient();
  patientForm!: FormGroup;

  bloodGroupEnum = BloodGroup;
  genderEnum = Gender;

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private patientService: PatientService,
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
          this.patient = patient;
          this.patientForm.setValue({
            id: this.patient.id ? this.patient.id : '',
            name: this.patient.name ? this.patient.name : '',
            gender: this.patient.gender ? this.patient.gender : '',
            dob: this.patient.dob ? this.patient.dob : '',
            bloodGroup: this.patient.bloodGroup ? this.patient.bloodGroup : '',
            mobileNumber: this.patient.mobileNumber ? this.patient.mobileNumber : '',
            email: this.patient.email ? this.patient.email : '',
            symptoms: this.patient.symptoms ? this.patient.symptoms : ''
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

      const patient: Patient = this.patientForm.value;
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
