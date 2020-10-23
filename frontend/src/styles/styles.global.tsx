import styled, { createGlobalStyle, css } from "styled-components";
import { AppTheme } from "./theme";

export const GlobalStyles = createGlobalStyle<{ theme: AppTheme }>`
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.textColor};
    }
`;

export const InlineContainer = styled.div<{ spaceBetween?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${({ spaceBetween }) => spaceBetween ? css`justify-content: space-between` : undefined}
`;