import ClassAnnounceCreateField from '@components/ClassAnnounceCreateField/ClassAnnounceCreateField';
import ClassAnnounceList from '@components/ClassAnnounceList/ClassAnnounceList';
import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';

interface ClassAnnounceWidgetProps extends UiComponentProps {
    classId: number | string;
}

const ClassAnnounceWidget: React.FC<ClassAnnounceWidgetProps> = ({
    classId,
}) => {
    return (
        <Container direction="vertical">
            <ClassAnnounceCreateField classID={classId} avatarSrc="" />
            <ClassAnnounceList classId={classId} />
        </Container>
    );
};

export default ClassAnnounceWidget;
