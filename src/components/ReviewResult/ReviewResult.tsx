import { HomeworkSolution } from "@app/features/homeworkSolution/homeworkSolutionModel";
import Review from "@components/Review/Review";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Overlay from "@ui-kit/Overlay/Overlay";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import React, { useId, useState } from "react";
import styles from './ReviewResult.module.scss';
import Icon from "@ui-kit/Icon/Icon";

interface ReviewResultProps extends UiComponentProps {
    solution: HomeworkSolution,
    allowChange?: boolean,
}

const ReviewResult: React.FC<ReviewResultProps> = ({
    solution,
    classes,
    allowChange = true,
}) => {
    const key = useId();
    const [overlay, setOverlay] = useState<boolean>(false);
    return (
        <Container
            gap="l"
            direction='vertical'
            layout='defaultBase'
            classes={classes}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Ваш отзыв:
            </Text>
            <Container
                direction='vertical'>
                {solution.teacherEvaluation
                    .split(/\\n|\n/g)
                    .slice(1)
                    .map((part, index) => (
                        <React.Fragment key={`${key}-${index}`}>
                            <Text
                                type="p"
                                size={1}
                                weight={part.startsWith('Задание') || part.startsWith('Результат') ? 'bold' : 'regular'}
                            >
                                {part}
                            </Text>
                        </React.Fragment>
                    ))}
            </Container>
            {allowChange && (
                <>
                    <Button
                        onClick={() => setOverlay(true)}
                        classes={styles.btn}
                    >
                        <Icon
                            name='pencilLine'
                            classes={styles.icon}
                        />
                        <Text
                            type="p"
                            size={1}
                            weight="bold"
                            classes={styles.text}
                        >
                            Изменить
                        </Text>
                    </Button>
                    <Overlay
                        isShowing={overlay}
                        closeOverlay={() => setOverlay(false)}
                    >
                        <Review
                            solution={solution}
                            onSuccess={() => setOverlay(false)}
                            classes={styles.changeForm}
                        />
                    </Overlay>
                </>
            )}
        </Container>
    );
}

export default ReviewResult;