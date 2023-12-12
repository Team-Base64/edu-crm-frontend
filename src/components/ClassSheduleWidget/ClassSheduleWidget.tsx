import { MyCalendar } from '@components/Calendar/Calendar';
import Widget from '@components/Widget/Widget';
import { useRef } from 'react';
import styles from './ClassSheduleWidget.module.scss';
import { CalendarControls } from '@components/CalendarControls/CalendarControls';
import Container from '@ui-kit/Container/Container';

interface ClassSheduleWidgetProps {
    classID: number;
}

const ClassSheduleWidget: React.FC<ClassSheduleWidgetProps> = ({ classID }) => {
    const calendarRef = useRef<HTMLIFrameElement>(null);
    return (
        <Widget
            title="Расписание для класса:"
            classes={styles.widget}
        >
            <Container
                classes={styles.container}
                gap="l"
            >
                <MyCalendar
                    classID={classID}
                    viewMode="weekNoTime"
                    iframeRef={calendarRef}
                    classes={styles.calendar}
                />
                <CalendarControls
                    iframeRef={calendarRef}
                    classID={classID}
                    classes={styles.controls}
                />
            </Container>
        </Widget>
    );
};

export default ClassSheduleWidget;
