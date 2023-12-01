import EmptyItem from '@components/EmptyItem/EmptyItem';
import React from 'react';

interface ShowQueryStateProps {
    status: {
        isLoading: boolean;
        isError: boolean;
    };
    errorText?: string;
}

const ShowQueryState: React.FC<ShowQueryStateProps> = ({
    status,
    errorText = 'Ошибка получения данных',
}) => {
    const { isLoading, isError } = status;
    return (
        <>
            {isLoading && <EmptyItem type="loading" />}
            {isError && (
                <EmptyItem
                    type="error"
                    text={errorText}
                />
            )}
        </>
    );
};
export default ShowQueryState;
