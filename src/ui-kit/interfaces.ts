import React from 'react';

export interface UiComponentProps {
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode;
    classes?: string;
}
