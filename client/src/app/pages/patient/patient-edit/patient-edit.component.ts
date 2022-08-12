import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PatientService} from "../patient.service";
import {Patient} from "../patient.model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit, OnDestroy {
  patient: Patient = new Patient();
  patientForm!: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();


  submitForm(): void {
    if (this.patientForm.valid) {
      console.log('submit', this.patientForm.value);
    } else {
      Object.values(this.patientForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private patientService: PatientService,
              private router: Router) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadData(){
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.patientService.get(params['id'])
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
    });
  }

  initForm() {
    this.patientForm = this.fb.group({
      name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      bloodGroup: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      symptoms: [null, [Validators.required]]
    });
  }

  save() {
    const patient: Patient = this.patientForm.value;

    this.patientService.save(patient).subscribe((patient) => {
      this.router.navigate(['/${propertyName}', 'show', patient.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        //this.errors = [json];
      } else {
        //this.errors = json._embedded.errors;
      }
    });
  }

}
