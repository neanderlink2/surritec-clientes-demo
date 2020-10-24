import { useField } from '@unform/core';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Form } from 'semantic-ui-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label?: string,
    icon?: React.ReactNode,
    onlyUpper?: boolean,
    required?: boolean,
    inlineInput?: boolean,
    hidden?: boolean,
    containerStyle?: CSSProperties,
    rows?: number,
    defaultValue?: string;
}

export default function InputField({
    name,
    label,
    icon,
    onlyUpper,
    required,
    inlineInput,
    containerStyle,
    hidden,
    rows,
    onChange,
    ...rest
}: InputFieldProps) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = rest?.defaultValue ?? '', registerField, error } = useField(name ?? "");

    const [valor, setValor] = useState(defaultValue);

    function onChangeText(e: any, changeValue: any) {
        const { value } = e.target;
        let tempValue = value;
        if (onlyUpper) {
            tempValue = tempValue.toUpperCase();
        }

        setValor(tempValue);
        if (onChange) {
            onChange(e);
        }
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            // getValue(ref) {
            //     return ref.inputRef.current.value;
            // },
            setValue(ref, value) {
                setValor(value ?? '');
                ref.value = value ?? '';
            },
            clearValue(ref, value) {
                //ref.value = value;
                setValor(value !== 'undefined' ? value ?? '' : '');
                ref.value = '';
            },
        });
    }, [fieldName, registerField]);

    return (
        <Form.Field required={required} error={!!error}>
            {label && <label>{label}</label>}
            <input ref={inputRef} name={fieldName} defaultValue={defaultValue} {...rest} />
            {!!error && <div className="ui below pointing prompt label" role="alert">{error}</div>}
        </Form.Field>
    )
}

type InputMaskFieldProps = InputFieldProps & {
    mask: string;
}

export function InputMaskField({
    name,
    mask,
    label,
    icon,
    onlyUpper,
    required,
    inlineInput,
    containerStyle,
    hidden,
    onChange,
    ...rest
}: InputMaskFieldProps) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue = rest?.defaultValue ?? '', registerField, error } = useField(name ?? "");

    const [valor, setValor] = useState(defaultValue);

    function onChangeText(e: any, d?: any) {
        const { value } = e.target;
        let tempValue = value;
        if (onlyUpper) {
            tempValue = tempValue.toUpperCase();
        }

        setValor(tempValue);
        if (onChange) {
            onChange(value);
        }
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            // getValue(ref) {
            //     return ref.inputRef.current.value;
            // },
            setValue(ref, value) {
                setValor(value ?? '');
                ref.value = value ?? '';
            },
            clearValue(ref, value) {
                //ref.value = value;
                setValor(value !== 'undefined' ? value ?? '' : '');
                ref.value = '';
            },
        });
    }, [fieldName, registerField]);

    return (
        <ReactInputMask
            id={fieldName}
            mask={mask}
            ref={inputRef}
            value={valor}
            defaultValue={defaultValue}
            onChange={onChangeText}
        >
            {() => (
                <Form.Field>
                    {label && <label>{label}</label>}
                    <input name={fieldName} defaultValue={defaultValue} {...rest} />
                </Form.Field>
            )}
        </ReactInputMask>
    )
}
