import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Button, Input, InputProps, Label } from 'semantic-ui-react';

type Props = InputProps & {
    onAddClick?: () => void;
    onRemoveClick?: () => void;
};

export default function AmountButton({ onAddClick, onRemoveClick, ...props }: Props) {
    return (
        <Input
            action
            labelPosition='right'
            type="number"
            defaultValue={1}
            min={1}
            max={99}
            step={1}
            {...props}
        >
            <Label as={Button} basic onClick={() => onRemoveClick && onRemoveClick()}>
                <FiMinus />
            </Label>
            <input readOnly />
            <Label as={Button} basic onClick={() => onAddClick && onAddClick()}>
                <FiPlus />
            </Label>
        </Input>
    )
}
