import React from 'react';
import { Button, ButtonProps, Popup } from 'semantic-ui-react';

type IconButtonProps = ButtonProps & {
    children: React.ReactNode;
    title?: string;
}

export default function IconButton({ children, title, ...props }: IconButtonProps) {
    return (
        <Popup content={title} trigger={
            <Button icon {...props}>
                {children}
            </Button>
        } />
    )
}
