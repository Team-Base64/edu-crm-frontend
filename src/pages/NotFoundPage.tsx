import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <Container direction="vertical">
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                404 Not Found
            </Text>
            <Text
                type="p"
                size={1}
                weight="bold"
            >
                Maybe page in progress...
            </Text>
            <div
                style={{ height: '50px', width: '50px' }}
                className="test"
            />
        </Container>
    );
};

export default NotFoundPage;
