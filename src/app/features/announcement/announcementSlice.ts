import appApi from '@app/appApi';
import { Announcement } from '@app/features/announcement/announcementModel';
import { announcementPaths } from '@app/features/announcement/announcementPaths';

export const announcementSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getClassAnnouncements: build.query<
            { posts: Announcement[] },
            { class_id: string | number }
        >({
            query: ({ class_id }) => {
                return {
                    url: announcementPaths.classAnnouncements(class_id),
                    method: 'GET',
                };
            },
        }),

        createAnnouncement: build.mutation<
            { announcement: Announcement },
            { class_id: string | number }
        >({
            query: ({ class_id }) => {
                return {
                    url: announcementPaths.createAnnouncement(class_id),
                    method: 'POST',
                };
            },
        }),
    }),
});

export const { useGetClassAnnouncementsQuery, useCreateAnnouncementMutation } =
    announcementSlice;
