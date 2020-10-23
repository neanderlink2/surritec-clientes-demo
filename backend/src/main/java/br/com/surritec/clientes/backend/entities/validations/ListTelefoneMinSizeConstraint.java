package br.com.surritec.clientes.backend.entities.validations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = ListTelefoneMinSizeConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface ListTelefoneMinSizeConstraint {
    String message() default "Tamanho mínimo excedido.";

    long value() default 999;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}