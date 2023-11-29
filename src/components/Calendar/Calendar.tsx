import React, { Suspense } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './Calendar.module.scss';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
import { useGetCalendarIDQuery } from '@app/features/calendar/calendarSlice.ts';
import Text from '@ui-kit/Text/Text.tsx';

interface CalendarProps extends UiComponentProps {
    mode: 'WEEK' | 'MONTH';
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const Calendar: React.FC<CalendarProps> = ({
    classes,
    mode,
    iframeRef,
}) => {
    const timeZone = 'Europe%2FMoscow';
    const showTimeZone = '1';
    const { data, isSuccess, error } = useGetCalendarIDQuery(null);

    console.log(error);
    // const src =
    // 'a7710d0da9bee0635aa37debf678be1295ad61bbaeff1c7248052b65deb7d91b@group.calendar.google.com';
    // '611a7b115cb31d14e41c9909e07db425548dd3b5fa76a145f3c93ae7410bc142@group.calendar.google.com';

    return (
        <Suspense
            fallback={
                <div className={[styles.calendar, classes].join(' ')}>
                    {}
                    <Spinner></Spinner>
                </div>
            }
        >
            {data && isSuccess ? (
                <iframe
                    ref={iframeRef}
                    src={`https://calendar.google.com/calendar/embed?ctz=${timeZone}&hl=ru&showTz=${showTimeZone}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=${data.googleid}&mode=${mode}`}
                    className={[styles.calendar, classes, styles.calentarStyle].join(' ')}
                ></iframe>
            ) : (
                <Text
                    type={'h'}
                    size={3}
                    classes={[
                        styles.calendar,
                        styles.calendarErrorId,
                        classes,
                    ].join(' ')}
                >
                    Ошибка при загрузке календаря
                </Text>
            )}
        </Suspense>
    );
};
