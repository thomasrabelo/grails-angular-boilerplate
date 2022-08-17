package grails.angular.boilerplate

class Appointment {

    String title
    String location
    Date from
    Date to
    Boolean allDay
    String symptom
    Department department
    Doctor consultation

    static constraints = {
        location(nullable: true)
        allDay(nullable: true)
        symptom(nullable: true)
    }
}
