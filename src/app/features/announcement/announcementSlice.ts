import appApi from '@app/appApi';
import { Announcement, AnnouncementCreatePayload } from '@app/features/announcement/announcementModel';
import { announcementPaths } from '@app/features/announcement/announcementPaths';



export const announcementSlice = appApi
    .enhanceEndpoints({
        addTagTypes: ['ClassFeed'],
    })
    .injectEndpoints({
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
                providesTags: (result, error, arg) => ([{
                    type: 'ClassFeed' as const,
                    id: arg.class_id,
                }]),
            }),

            createAnnouncement: build.mutation<
                { post: Announcement },
                { class_id: string | number, payload: AnnouncementCreatePayload }
            >({
                query: ({ class_id, payload }) => {
                    return {
                        url: announcementPaths.createAnnouncement(class_id),
                        method: 'POST',
                        body: JSON.stringify(payload),
                    };
                },
                invalidatesTags: (result, error, arg) => ([{
                    type: 'ClassFeed' as const,
                    id: arg.class_id,
                }]),
            }),
        }),
    });

export const { useGetClassAnnouncementsQuery, useCreateAnnouncementMutation } =
    announcementSlice;
