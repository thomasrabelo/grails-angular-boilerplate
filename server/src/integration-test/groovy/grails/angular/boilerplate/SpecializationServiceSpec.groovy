package grails.angular.boilerplate

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import org.grails.datastore.mapping.core.Datastore
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class SpecializationServiceSpec extends Specification {

    SpecializationService specializationService
    @Autowired Datastore datastore

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Specialization(...).save(flush: true, failOnError: true)
        //new Specialization(...).save(flush: true, failOnError: true)
        //Specialization specialization = new Specialization(...).save(flush: true, failOnError: true)
        //new Specialization(...).save(flush: true, failOnError: true)
        //new Specialization(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //specialization.id
    }

    void cleanup() {
        assert false, "TODO: Provide a cleanup implementation if using MongoDB"
    }

    void "test get"() {
        setupData()

        expect:
        specializationService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Specialization> specializationList = specializationService.list(max: 2, offset: 2)

        then:
        specializationList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        specializationService.count() == 5
    }

    void "test delete"() {
        Long specializationId = setupData()

        expect:
        specializationService.count() == 5

        when:
        specializationService.delete(specializationId)
        datastore.currentSession.flush()

        then:
        specializationService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Specialization specialization = new Specialization()
        specializationService.save(specialization)

        then:
        specialization.id != null
    }
}
