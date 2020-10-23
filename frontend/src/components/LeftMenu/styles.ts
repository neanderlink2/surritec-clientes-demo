import { List, ListItemProps } from 'semantic-ui-react';
import styled from 'styled-components';

export const LeftMenuContainer = styled.div`
    padding: 10px;
    width: 100%;
`;

export const ListItem = styled(List.Item)<ListItemProps>`
    padding: 10px;
`;