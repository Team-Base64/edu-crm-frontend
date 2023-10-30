import Avatar from "@ui-kit/Avatar/Avatar";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import TextArea from "@ui-kit/TextArea/TextArea";
import { ChangeEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import styles from './AnnounceCreateField.module.scss';

interface AnnounceCreateFieldProps {
    avatarSrc : string;
}

const AnnounceCreateField : React.FC<AnnounceCreateFieldProps> = ({avatarSrc}) => {
    const id = useId();
    const [text, setText ] = useState<string>('');
    const textarea_ref = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if(!textarea_ref.current){
            return;
        }
        textarea_ref.current.style.height = "0px";
        const scrollHeight = textarea_ref.current.scrollHeight;
        textarea_ref.current.style.height = scrollHeight + "px";
    }, [textarea_ref, text]);

    const handleChagne = useCallback((e : ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setText(e.target.value.trim());
    }, [setText]);

    return (

        <Container classes={styles.card} direction="horizontal">
            <Avatar classes={styles.avatar} src={avatarSrc}/>
            <TextArea classes={styles.area}
             name='announce'
             spellcheck={true}
             id={id}
             textareaText={'Напишите что-нибудь всему классу...'}
             border={'noBroder'}
             rows={1}
             onChange={handleChagne}
             textAreaRef={textarea_ref}
             />
             <Icon classes={styles.btn} name='chatSend'/>
        </Container>
    );
} 

export default AnnounceCreateField;