package grails.angular.boilerplate

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class DoctorSpec extends Specification implements DomainUnitTest<Doctor> {

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
            true == false
    }
}