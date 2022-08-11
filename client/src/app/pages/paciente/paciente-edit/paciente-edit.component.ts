import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzFormTooltipIcon} from "ng-zorro-antd/form";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PacienteService} from "../paciente.service";
import {Paciente} from "../paciente.model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrls: ['./paciente-edit.component.css']
})
export class PacienteEditComponent implements OnInit, OnDestroy {
  paciente: Paciente = new Paciente();
  pacienteForm!: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();


  submitForm(): void {
    if (this.pacienteForm.valid) {
      console.log('submit', this.pacienteForm.value);
    } else {
      Object.values(this.pacienteForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private pacienteService: PacienteService,
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
        this.pacienteService.get(params['id'])
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((paciente) => {
            this.paciente = paciente;
            this.pacienteForm.setValue({
              nome: this.paciente.nome ? this.paciente.nome : '',
              rg: this.paciente.rg ? this.paciente.rg : '',
              cpf: this.paciente.cpf ? this.paciente.cpf : ''
            });
          });
      }
    });
  }

  initForm() {
    this.pacienteForm = this.fb.group({
      nome: [null, [Validators.required]],
      rg: [null, [Validators.required]],
      cpf: [null, [Validators.required]]
    });
  }

  save() {
    const paciente: Paciente = this.pacienteForm.value;

    this.pacienteService.save(paciente).subscribe((paciente) => {
      this.router.navigate(['/${propertyName}', 'show', paciente.id]);
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
