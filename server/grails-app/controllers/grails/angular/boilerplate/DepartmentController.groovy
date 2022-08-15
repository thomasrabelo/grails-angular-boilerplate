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
class DepartmentController {

    DepartmentService departmentService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond (departmentList: departmentService.list(params), departmentTotalCount: departmentService.count())
    }

    def show(Long id) {
        respond departmentService.get(id)
    }

    @Transactional
    def save(Department department) {
        if (department == null) {
            render status: NOT_FOUND
            return
        }
        if (department.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond department.errors
            return
        }

        try {
            departmentService.save(department)
        } catch (ValidationException e) {
            respond department.errors
            return
        }

        respond department, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Department department) {
        if (department == null) {
            render status: NOT_FOUND
            return
        }
        if (department.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond department.errors
            return
        }

        try {
            departmentService.save(department)
        } catch (ValidationException e) {
            respond department.errors
            return
        }

        respond department, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || departmentService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
