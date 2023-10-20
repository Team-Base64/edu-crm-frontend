import React from 'react';

export interface UiComponentPropsMap {
    [key: string]: string;
}
export interface UiComponentProps {
    onClick?: React.MouseEventHandler;
    children?: React.ReactNode;
    classes?: string;
}
