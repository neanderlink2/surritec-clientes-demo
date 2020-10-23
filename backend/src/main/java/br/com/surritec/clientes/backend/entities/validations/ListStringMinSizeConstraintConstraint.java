package br.com.surritec.clientes.backend.entities.validations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = ListStringMinSizeConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface ListStringMinSizeConstraintConstraint {
    String message() default "Tamanho mínimo inválido.";

    long value() default 1;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}