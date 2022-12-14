package grails.angular.boilerplate

import grails.gorm.services.Service

@Service(Appointment)
interface AppointmentService {

    Appointment get(Serializable id)

    List<Appointment> list(Map args)

    Long count()

    Appointment delete(Serializable id)

    Appointment save(Appointment appointment)

}
