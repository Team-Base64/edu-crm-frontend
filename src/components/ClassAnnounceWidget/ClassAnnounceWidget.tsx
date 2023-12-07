import { useGetClassStudentsQuery } from '@app/features/stundent/stundentSlice';
import ClassAnnounceCreateField from '@components/ClassAnnounceCreateField/ClassAnnounceCreateField';
import ClassAnnounceList from '@components/ClassAnnounceList/ClassAnnounceList';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';

interface ClassAnnounceWidgetProps extends UiComponentProps {
    classId: number | string;
}

const ClassAnnounceWidget: React.FC<ClassAnnounceWidgetProps> = ({
    classId,
}) => {
    const { data, isSuccess, ...status } = useGetClassStudentsQuery({
        class_id: classId,
    });
    return (
        <Container direction="vertical">
            <ShowQueryState status={status} />
            {isSuccess && (
                <>
                    <ClassAnnounceCreateField
                        classID={classId}
                        disabled={!data.students.length}
                    />{' '}
                    {/* avatarSrc="" */}
                    <ClassAnnounceList classId={classId} />
                </>
            )}
        </Container>
    );
};

export default ClassAnnounceWidget;
