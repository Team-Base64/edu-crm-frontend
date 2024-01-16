import React, { useEffect } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';
import { SearchDialogList } from '@components/SearchDialogList/SearchDialogList.tsx';
import styles from './MessageSelector.module.scss';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice';
import { SetURLSearchParams } from 'react-router-dom';
import { routerQueryParams } from '@router/routes.ts';
import { updateOneSearchParam } from '../../utils/router/searchParams.ts';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';

interface MessageSelectorProps extends UiComponentProps {
    useQueryParams: [URLSearchParams, SetURLSearchParams];
}

const messageSelectorIDBase = 'dialog-chat--';

const MessageSelector: React.FC<MessageSelectorProps> = ({
    useQueryParams,
    classes,
}) => {
    const { data, isLoading, isSuccess } = useGetDialogsQuery(null);

    const [searchParams, setSearchParams] = useQueryParams;

    const getSearchParam = () =>
        (
            searchParams.get(routerQueryParams.messenger.search) ?? ''
        ).toLowerCase();

    useEffect(() => {
        if (!getSearchParam()) {
            const element = document.getElementById(
                messageSelectorIDBase + '0',
            );
            if (element) {
                element.click();
            }
        }
    }, []);

    const dialogList = Object.values(data?.dialogs ?? {})
        .sort((a, b) =>
            new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1,
        )
        .filter(
            (dialog) =>
                (dialog.studentName &&
                    dialog.text &&
                    dialog.studentName
                        .toLowerCase()
                        .includes(getSearchParam())) ||
                dialog.text.toLowerCase().includes(getSearchParam()),
        )
        .map((dialog, index) => {
            return (
                <MessageSelectDialogItem
                    data={dialog}
                    key={dialog.chatID}
                    selectDialog={() =>
                        setSearchParams(
                            updateOneSearchParam(
                                searchParams,
                                routerQueryParams.messenger.chatid,
                                dialog.chatID,
                            ),
                        )
                    }
                    isSelected={
                        searchParams.get(routerQueryParams.messenger.chatid) ==
                        dialog.chatID
                    }
                    id={`${messageSelectorIDBase}${index}`}
                ></MessageSelectDialogItem>
            );
        });

    return (
        <Container
            direction={'vertical'}
            layout={'base'}
            classes={[styles.messageSelector, classes].join(' ')}
        >
            <SearchDialogList
                useQueryParams={[searchParams, getSearchParam, setSearchParams]}
            ></SearchDialogList>
            <div className={styles.messageSelectorDialogs}>
                {isSuccess && dialogList}
                {isLoading && <Spinner></Spinner>}
            </div>
        </Container>
    );
};

export default MessageSelector;
