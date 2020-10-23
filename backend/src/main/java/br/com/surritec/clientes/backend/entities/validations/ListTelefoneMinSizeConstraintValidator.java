package br.com.surritec.clientes.backend.entities.validations;

import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import br.com.surritec.clientes.backend.entities.Telefone;

public class ListTelefoneMinSizeConstraintValidator
        implements ConstraintValidator<ListTelefoneMinSizeConstraint, List<Telefone>> {
    private long minSize;

    @Override
    public void initialize(ListTelefoneMinSizeConstraint constraintAnnotation) {
        this.minSize = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(List<Telefone> values, ConstraintValidatorContext context) {
        if (values == null) {
            return false;
        }
        return values.size() >= this.minSize;
    }
}
