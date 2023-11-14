import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';

import styles from './Widget.module.scss';
import { UiComponentProps } from '@ui-kit/interfaces';

interface WidgetProps extends UiComponentProps {
    title: string;

    nav?: JSX.Element;

    footer?: JSX.Element;
}

const Widget: React.FC<WidgetProps> = ({
    classes,
    title,
    nav,
    children,
    footer,
}) => {
    return (
        <>
            <Container
                direction="vertical"
                layout="defaultBase"
                gap="l"
                classes={[classes].join(' ')}
            >
                <Container
                    direction="horizontal"
                    classes={styles.header}
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        {title}
                    </Text>
                    {nav}
                </Container>
                {children}
                {footer}
            </Container>
        </>
    );
};

export default Widget;
