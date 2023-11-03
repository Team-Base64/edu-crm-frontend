// import ClassMemberItem from "@components/ClassMemberItem/ClassMemberItem";
// import { UiComponentProps } from "@ui-kit/interfaces";
// import { useGetClassUsersByIdQuery } from "app/features/api/class/classSlice";
// import React, { useId } from "react";
// import styles from './HomeworkWidget.module.scss';

// interface HomeworkListProps extends UiComponentProps {
//     classId: string | number;
//     limit?: number;
// }

// const HomeworkList: React.FC<HomeworkListProps> = ({ classId, limit }) => {
//     const listId = useId();
//     const { data, isError, error } =

//     if (!data?.students || isError) {
//         return (
//             <>
//                 {isError && JSON.stringify(error)}
//                 {!isError && 'Some error'}
//             </>
//         );
//     }

//     const list = data.students;
//     return (
//         <>
//                 {!list.length && 'EMPTY'}

//             {list.length && list.slice(0, limit).map(({ id, firstName, lastName, avatarSrc }) => (
//                 <React.Fragment key={`${listId}-${id}`}>
//                     <ClassMemberItem
//                         id={id}
//                         firstName={firstName}
//                         lastName={lastName}
//                         avatarSrc={avatarSrc}
//                         role="Ученик"
//                     />
//                 </React.Fragment>
//             ))}
//         </>
//     );
// }

// export default HomeworkList;
