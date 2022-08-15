import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzCalendarMode} from "ng-zorro-antd/calendar";
import {Department, Doctor} from "../../doctor/doctor.model";
import {Subject, takeUntil} from "rxjs";
import {DoctorService} from "../../doctor/doctor.service";

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.css']
})
export class AppointmentScheduleComponent implements OnInit, OnDestroy {

  isLoadingListOfSpecialists: boolean = false;
  listOfSpecialists: Doctor[] = [];

  date: Date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadSpecialists();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadSpecialists() {
    this.isLoadingListOfSpecialists = true;
    this.doctorService.list(0, 1000, 'name', 'asc')
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(doctorResultList => {
        this.isLoadingListOfSpecialists = false;
        this.listOfSpecialists = doctorResultList.resultList;
      })
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

}
