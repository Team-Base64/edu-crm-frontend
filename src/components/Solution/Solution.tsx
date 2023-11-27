import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';

import styles from './Solution.module.scss';
import Text from '@ui-kit/Text/Text';
import Label from '@ui-kit/Label/Label';
import { IframeViewer } from '@ui-kit/IframeViewer/IframeViewer';
import { Attachment } from '@ui-kit/Attachment/Attachment';
import { noop } from '@app/const/consts';
import { useGetSolutionQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import { useState } from 'react';
import Hint from '@ui-kit/Hint/Hint';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface SolutionProps extends UiComponentProps {
    id: number | string;
}

const Solution: React.FC<SolutionProps> = ({ id, classes }) => {
    const { data, isSuccess, ...status } = useGetSolutionQuery({
        id: id,
    });
    const [currentAttach, setCurrentAttach] = useState<string>('');
    const hintState = useState<boolean>(true);

    const handleAttachClick = (file: string) => {
        if (currentAttach === file) {
            return true;
        }

        setCurrentAttach(file);
        return false;
    };

    return (
        <Container
            direction="vertical"
            layout="defaultBase"
            gap="l"
            classes={[styles.widget, classes].join(' ')}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Содержание решения:
            </Text>
            <ShowQueryState status={status}/>
            {isSuccess && (
                <>
                    {/* <Container direction='vertical'>
                        <Text type='h' size={4} weight="bold">
                           История решений:
                        </Text>
                        <Container>
                            <SolutionSelect solution={data}/>
                        </Container>
                    </Container> */}
                    <Container direction="vertical">
                        <Label
                            text="Сообщение: "
                            type="h"
                            size={4}
                            weight="bold"
                        />
                        <Text
                            type="p"
                            size={1}
                        >
                            {data.solution.text?.length
                                ? data.solution.text
                                : 'Сообщение не приложено'}
                        </Text>
                    </Container>
                    <Container direction="vertical">
                        <Label
                            text="Вложения: "
                            type="h"
                            size={4}
                            weight="bold"
                        />
                        <Hint
                            state={hintState}
                            text={
                                'Чтобы посмотреть нажмите на вложение, чтобы развернуть нажмите дважды'
                            }
                        />
                        <Attachment
                            classes={styles.attach}
                            allowOpen={() =>
                                handleAttachClick(data.solution.file)
                            }
                            file={data.solution.file}
                            onRemoveClick={noop}
                            isStatic={true}
                        />
                    </Container>
                    <IframeViewer
                        classes={styles.preview}
                        linkToFile={currentAttach}
                    />
                </>
            )}
        </Container>
    );
};

export default Solution;
