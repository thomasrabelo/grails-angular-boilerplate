package grails.angular.boilerplate

import grails.gorm.services.Service
import grails.gorm.services.Where

@Service(Doctor)
interface DoctorService {

    Doctor get(Serializable id)

    List<Doctor> list(Map args)

    Long count()

    Doctor delete(Serializable id)

    Doctor save(Doctor doctor)

    @Where({ specialization.id == id })
    List<Doctor> findAllBySpecializationId(Long id, Map args)
}
