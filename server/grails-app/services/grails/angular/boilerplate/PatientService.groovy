package grails.angular.boilerplate

import grails.gorm.services.Service

@Service(Patient)
interface PatientService {

    Patient get(Serializable id)

    List<Patient> list(Map args)

    Long count()

    Patient delete(Serializable id)

    Patient save(Patient patient)

}
