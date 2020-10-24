import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthProvider';

type Props = {
    children?: React.ReactNode;
    roles: string[]
}

export default function Allowed({ children, roles }: Props) {
    const { user } = useAuth();

    const allowed = useMemo(() => {
        return !!roles.find(role => user?.roles.includes(role));
    }, [user, roles]);

    if (!allowed) {
        return null;
    }

    return (
        <>{children}</>
    )
}
