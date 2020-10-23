package br.com.surritec.clientes.backend.entities.validations;

import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ListStringMinSizeConstraintValidator
        implements ConstraintValidator<ListStringMinSizeConstraintConstraint, List<String>> {
    private long minSize;

    @Override
    public void initialize(ListStringMinSizeConstraintConstraint constraintAnnotation) {
        this.minSize = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(List<String> values, ConstraintValidatorContext context) {
        if (values == null) {
            return false;
        }
        return values.size() >= this.minSize;
    }
}
