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
                    title: "درحال بارگذاری",
                    text: "لطفا کمی صبر کنید...",
                }]);
                const { status, data } = await noticeServices.getShortNotices();
                if (status === Configs.Status.Successful) {
                    //return data.notices;
                    
                    if (data.notices.length) setNotices([...data.notices.reverse()]);
                    //if all is empty
                    else {
                        setNotices([{
                            title: "پیام",
                            text: "اطلاعیه جدیدی وجود ندارد.",
                        }]);
                    }
                }
            } catch (err) {
                // show error message within 
                setNotices([
                    {
                        title: "خطا",
                        text: "...مشکلی حین بارگذاری اطلاعیه ها پیش آمد. دوباره امتحان کنید",
                    },
                    {
                        title: "توجه",
                        text: "متاسفانه مدتی است هاست این وب اپ تمدید نشده است. بزودی مشکل حل خواهد شد. در حال حاضر فقط بخش بازی تک نفره فعال می باشد...",
                    },
                ]);
            }
        })();
        
    }, []);

    return (
        <Card className="notice-sidebar animated-form" border="success">
            <Card.Header className="text-center text-success">
                اطلاعیه ها
            </Card.Header>
            <Card.Body className="text-right">
                {Boolean(notices.length) && notices.map((notice) => {
                    return (
                        <Fragment key={uuidv1()}>
                            <Alert variant="info">
                                <i
                                    className="fa fa-rss px-3"
                                    aria-hidden="true"></i>
                                <span
                                    style={{ color: "red", fontSize: "15px" }}>
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
