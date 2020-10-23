import * as Yup from 'yup';

export const createSchema = (password: string) => Yup.object().shape({
    email: Yup.string()
        .required('O e-amil é obrigatório.')
        .min(3, 'O e-mail está muito curto.')
        .email('O e-mail digitado é inválido.'),
    first_name: Yup.string()
        .required('O nome é obrigatório.')
        .min(2, 'Nome muito curto.')
        .max(100, 'Nome muito longo.'),
    last_name: Yup.string()
        .required('O nome é obrigatório.')
        .min(2, 'Nome muito curto.')
        .max(100, 'Nome muito longo.'),
    password: Yup.string()
        .required('A senha é obrigatória.')
        .min(6, 'A senha deve possuir no mínimo 6 caracteres.'),
    re_password: Yup.string()
        .required('A senha é obrigatória.')
        .min(6, 'A senha deve possuir no mínimo 6 caracteres.')
        .test('password equals confirmation', 'A senha e a confirmação da senha estão diferentes.', (value) => {
            return value === password
        }),
})