package grails.angular.boilerplate

import grails.gorm.services.Service

@Service(Specialization)
interface SpecializationService {

    Specialization get(Serializable id)

    List<Specialization> list(Map args)

    Long count()

    Specialization delete(Serializable id)

    Specialization save(Specialization specialization)

}
