import React from 'react';

export interface UiComponentProps {
    onClick: React.MouseEventHandler;
    children: React.ReactNode;
    size?: 's' | 'm' | 'l' | 'undefined';
    classes?: string;
}
