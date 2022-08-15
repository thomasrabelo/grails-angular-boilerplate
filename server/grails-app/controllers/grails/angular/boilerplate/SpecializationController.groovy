package grails.angular.boilerplate

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class SpecializationController {

    SpecializationService specializationService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond (specializationList: specializationService.list(params), specializationTotalCount: specializationService.count())
    }

    def show(Long id) {
        respond specializationService.get(id)
    }

    @Transactional
    def save(Specialization specialization) {
        if (specialization == null) {
            render status: NOT_FOUND
            return
        }
        if (specialization.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond specialization.errors
            return
        }

        try {
            specializationService.save(specialization)
        } catch (ValidationException e) {
            respond specialization.errors
            return
        }

        respond specialization, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Specialization specialization) {
        if (specialization == null) {
            render status: NOT_FOUND
            return
        }
        if (specialization.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond specialization.errors
            return
        }

        try {
            specializationService.save(specialization)
        } catch (ValidationException e) {
            respond specialization.errors
            return
        }

        respond specialization, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || specializationService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
