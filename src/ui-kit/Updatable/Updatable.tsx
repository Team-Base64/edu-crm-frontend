import React, { useEffect, useState } from "react";

interface Props<T> {
    element: React.FC<T>;
    updateProps: () => T;
    interval: number;
};

const Updatable = <T extends object>(props: Props<T> & { children?: React.ReactNode }) => {
    const { element, updateProps, interval } = props;
    const [rendered, update] = useState<React.ReactNode>(element(updateProps()));

    useEffect(() => {
        const timer = setInterval(() => {
            update(element(updateProps()));
        }, interval * 1000);

        return () => {
            clearInterval(timer);
        }
    }, [update, updateProps]);

    return (
        <>
            {rendered}
        </>
    );
}

export default Updatable;