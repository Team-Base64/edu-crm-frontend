import AnnounceCreateField from '@components/AnnounceCreateField/AnnounceCreateField';
import SendMessageArea from '@components/SendMessageArea/SendMessageArea';
import React from 'react';

const TestPage: React.FC = () => {
    return (
        <div>
            <h1>TEST PAGE</h1>
            <p>IN PROGESS</p>

            <AnnounceCreateField avatarSrc="" />
            <SendMessageArea
                id="gg"
                name="ggm"
                onMessageSend={(text) => console.log(text)}
            />
        </div>
    );
};

export default TestPage;
