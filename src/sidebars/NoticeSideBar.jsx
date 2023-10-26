import "./sidebars.css";
import { Fragment, useEffect, useState } from "react";
import noticeServices from "../services/http/noticeServices";
import Configs from "../services/configs";
import { Alert, Card } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
const NoticeSideBar = () => {
    const [notices, setNotices] = useState([]);

    // oncomponentMount or update
    useEffect(() => {
        (async () => {
            try {
                setNotices([{
                    title: "Loading",
                    text: "Please wait a moment...",
                }]);
                const { status, data } = await noticeServices.getShortNotices();
                if (status === Configs.Status.Successful) {
                    //return data.notices;
                    
                    if (data.notices.length) setNotices([...data.notices.reverse()]);
                    //if all is empty
                    else {
                        setNotices([{
                            title: "Message",
                            text: "No new notices.",
                        }]);
                    }
                }
            } catch (err) {
                // show error message within 
                setNotices([
                    {
                        title: "Error",
                        text: "Failed to load notices. Please try again.",
                    },
                    {
                        title: "Notice",
                        text: "The hosting plan is temporarily inactive. It will be resolved soon. Currently only single-player mode is available.",
                    },
                ]);
            }
        })();
        
    }, []);

    return (
        <Card className="notice-sidebar animated-form" border="success">
            <Card.Header className="text-center text-success">
                Notices
            </Card.Header>
            <Card.Body className="text-left">
                {Boolean(notices.length) && notices.map((notice) => {
                    return (
                        <Fragment key={uuidv1()}>
                            <Alert variant="info">
                                <i
                                    className="fa fa-rss px-3"
                                    aria-hidden="true"></i>
                                <span
                                    style={{ color: "red", fontSize: "18px" }}>
                                    {notice.title}
                                </span>
                                : {notice.text}
                            </Alert>
                            <hr />
                        </Fragment>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export default NoticeSideBar;
