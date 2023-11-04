import ClassMemberList from '@components/ClassMemberList/ClassMemberList';
import Widget from '@components/Widget/Widget';
import Button from '@ui-kit/Button/Button';
import Overlay from '@ui-kit/Overlay/Overlay';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';
import styles from './ClassMembersWidget.module.scss';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';

interface ClassMembersWidgetProps extends UiComponentProps {
    classId: string | number;
}

const ClassMembersWidget: React.FC<ClassMembersWidgetProps> = ({
    classId,
    classes,
}) => {
    const [isOverlay, setIsOverlay] = useState<boolean>(false);

    const handleShowAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOverlay(true);
    };

    const showAllButton = (
        <>
            <Button
                type="link"
                size="s"
                classes={styles.btnShowAll}
                onClick={handleShowAll}
            >
                Посмотреть всех
            </Button>
        </>
    );

    return (
        <>
            <Overlay
                isShowning={isOverlay}
                closeOverlay={() => setIsOverlay(false)}
            >
                <Container
                    direction="vertical"
                    layout="defaultBase"
                >
                    <Container
                        layout="defaultBase"
                        classes={styles.title}
                    >
                        <Text
                            type="h"
                            size={4}
                            weight="bold"
                        >
                            {'Все участники группы'}
                        </Text>
                    </Container>
                    <ClassMemberList
                        classId={classId}
                        classes={styles.fullPage}
                    />
                </Container>
            </Overlay>

            <Widget
                title="Участники: "
                nav={showAllButton}
                classes={classes}
            >
                <ClassMemberList
                    classId={classId}
                    limit={2}
                />
            </Widget>
        </>
    );
};

export default ClassMembersWidget;

// import Container from '@ui-kit/Container/Container';
// import Text from '@ui-kit/Text/Text';
// import { UiComponentProps } from '@ui-kit/interfaces';
// import React, { useState } from 'react';

// import styles from './ClassMembersWidget.module.scss';
// import Button from '@ui-kit/Button/Button';
// import Overlay from '@ui-kit/Overlay/Overlay';
// import ClassMemberList from '@components/ClassMemberList/ClassMemberList';

// interface ClassMembersWidgetProps extends UiComponentProps {
//     classId: string | number;
// }

// const ClassMembersWidget: React.FC<ClassMembersWidgetProps> = ({ classId }) => {
//     const [isOverlay, setIsOverlay] = useState<boolean>(false);

//     const handleShowAll = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setIsOverlay(true);
//     };

//     return (
//         <>
//             <Overlay
//                 isShowning={isOverlay}
//                 closeOverlay={() => setIsOverlay(false)}
//             >
//                 <ClassMemberList classId={classId} title='Участники класса' classes={styles.fullPage}/>
//             </Overlay>
//             <Container
//                 direction="vertical"
//                 classes={styles.widget}
//                 layout="defaultBase"
//             >
//                 <Container
//                     direction="horizontal"
//                     classes={styles.header}
//                 >
//                     <Text
//                         type="h"
//                         weight="bold"
//                         size={5}
//                     >
//                         Ученики:
//                     </Text>
//                     <Button
//                         type="link"
//                         size="s"
//                         classes={styles.btnShowAll}
//                         onClick={handleShowAll}
//                     >
//                         Посмотреть всех
//                     </Button>
//                 </Container>
//                 <Container
//                     direction="vertical"
//                     classes={styles.content}
//                 >
//                     <ClassMemberList classId={classId} limit={2} />
//                 </Container>
//             </Container>
//         </>
//     );
// };

// export default ClassMembersWidget;
