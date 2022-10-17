import { Fragment, useLayoutEffect, useState, useEffect } from "react";
import { Planets, Circle2, Sugar } from "react-preloaders2";

const LoadingBar = ({ loading }) => {
    const [whichOne, setWhichOne] = useState(0);
    useEffect(() => {
        setWhichOne(Math.floor(Math.random() * 100)); //randomize animation
    }, []);
    useLayoutEffect(() => {
        document.body.style = { overflowY: "auto" };
        document.body.style = { height: "auto" };
    }, [loading, whichOne]); //may have bug yet!!
    //random animation
    const selectedLoader =
        whichOne % 3 === 0 ? (
            <Circle2 time={0} customLoading={loading} />
        ) : whichOne % 3 === 1 ? (
            <Planets time={0} customLoading={loading} />
        ) : (
            <Sugar time={0} customLoading={loading} />
        );

    return <Fragment>{loading ? selectedLoader : null}</Fragment>;
};

export default LoadingBar;
