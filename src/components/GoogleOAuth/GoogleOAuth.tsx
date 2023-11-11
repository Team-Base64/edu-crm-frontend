import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Text from '@ui-kit/Text/Text.tsx';
import Button from '@ui-kit/Button/Button.tsx';
// import styles from './GoogleOAuth.module.scss';

interface GoogleOAuthProps extends UiComponentProps {}

export const GoogleOAuth: React.FC<GoogleOAuthProps> = () => {
    return (
        <Button>
            <Text
                type={'h'}
                size={5}
            >
                Войти с помощью Google
            </Text>
        </Button>
    );
};
