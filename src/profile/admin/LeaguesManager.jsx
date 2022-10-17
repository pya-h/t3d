import { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import LoadingBar from "../../commons/LoadingBar";
import { Sorry, OK } from "./../../tools/notification";
import leagueServices from "./../../services/http/leagueServices";
import { Status } from "../../services/configs";

const LeaguesManager = () => {
    const [Mode, setMode] = useState(0);
    const [title, setTitle] = useState("");
    const [capacity, setCapacity] = useState(20);
    const [prize, setPrize] = useState(50);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const [dimension, setDimension] = useState(4);
    const [isScoreless, setScoreless] = useState(false);

    const create = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            const { status } = await leagueServices.createLeague(
                password,
                Mode,
                isScoreless,
                dimension,
                title,
                capacity,
                prize
            );
            if (status === Status.CreatedSuccessfully)
                OK(`لیگ ${title} با موفقیت ساخته شد.`);
        } catch (err) {
            if (!Status.isErrorExpected(err))
                Sorry(
                    "خطا در برقراری ارتباط ... لطفا ارتباط خود را با اینترنت بررسی کنید."
                );
            setLoading(false);
        }
        setLoading(false);
    };
    const Modes = { Kickout: 0, Main: 1, Championship: 2, Custom: 3 };

    return (
        <Form onSubmit={(e) => create(e)}>
            <LoadingBar loading={loading} />
            <Card
                border="success"
                bg="transparent"
                className="mx-auto notice-manager-card"
            >
                <Card.Header  bg="transparent" className="text-center mx-auto w-100 m-0 p-0 pb-1">
                    <Row className="m-0 p-0">
                        <Col lg={2} md={2} sm={4} xs={4}>
                            <Form.Label className="text-center w-100 my-2">
                                رمزعبور فعلی
                            </Form.Label>
                        </Col>
                        <Col lg={7} md={7} sm={8} xs={8}>
                            <Form.Control
                                type="password"
                                className="text-left account-info-textbox animated-textbox"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                onInput={(e) => e.target.setCustomValidity("")}
                                onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                        "جهت اعمال هر گونه تغییر در حساب کاربری تان باید رمز عبور خود را وارد نمایید"
                                    )
                                }
                            />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Button
                                type="submit"
                                block
                                variant="primary"
                                className="mt-2 animated-button"
                            >
                                <i
                                    className="fa fa-floppy-o px-2"
                                    aria-hidden="true"
                                ></i>
                                ساخت لیگ
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{ overflowY: "auto" }} className="text-right">
                    <Row className="my-1">
                        <Form.Control
                            type="text"
                            className="account-info-textbox animated-textbox"
                            pattern="[آ-ی ]{3,}" // persian characters and space
                            onInput={(e) => e.target.setCustomValidity("")}
                            onInvalid={(e) =>
                                e.target.setCustomValidity(
                                    "نام لیگ باید با حروف فارسی و با حداقل طول سه حرف باشد"
                                )
                            }
                            placeholder="نام لیگ"
                            value={title}
                            required="required"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Row>
                    <hr />
                    <Row className="my-1 justify-content-center">
                        <Form.Label className="text-center">نوع لیگ</Form.Label>
                    </Row>
                    <hr />
                    <Row className="m-0 p-0 justify-content-center">
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    Mode === Modes.Kickout
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setMode(Modes.Kickout)}
                                block
                            >
                                حذفی
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    Mode === Modes.Main
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setMode(Modes.Main)}
                                block
                            >
                                امتیازی
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    Mode === Modes.Championship
                                        ? "success"
                                        : "outline-secondary"
                                }
                                block
                                onClick={() => setMode(Modes.Championship)}
                            >
                                قهرمانان
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    Mode === Modes.Custom
                                        ? "success"
                                        : "outline-secondary"
                                }
                                block
                                onClick={() => setMode(Modes.Custom)}
                            >
                                کاستوم
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="my-1 justify-content-center">
                        <Form.Label className="text-center">
                            نوع بازی ها
                        </Form.Label>
                    </Row>
                    <hr />
                    <Row className="my-1 justify-content-center">
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    dimension === 3
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setDimension(3)}
                                block
                            >
                                3 * 3 * 3
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    dimension === 4
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setDimension(4)}
                                block
                            >
                                4 * 4 * 4
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    dimension === 5
                                        ? "success"
                                        : "outline-secondary"
                                }
                                block
                                onClick={() => setDimension(5)}
                            >
                                5 * 5 * 5
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="my-1  justify-content-center">
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    isScoreless
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setScoreless(true)}
                                block
                            >
                                سرعتی
                            </Button>
                        </Col>
                        <Col className="my-1 text-center" xs={3}>
                            <Button
                                variant={
                                    !isScoreless
                                        ? "success"
                                        : "outline-secondary"
                                }
                                onClick={() => setScoreless(false)}
                                block
                            >
                                امتیازی
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="my-1 justify-content-center">
                        <Form.Label className="text-center">تنظیمات</Form.Label>
                    </Row>
                    <Row>
                        <Col className="my-1 text-center">
                            <hr />

                            <Row className="justify-content-around">
                                <Form.Label className="text-center">
                                    ظرفیت
                                </Form.Label>
                            </Row>
                            <hr />
                            <Form.Control
                                type="number"
                                className="account-info-textbox animated-textbox text-center"
                                placeholder="ظرفیت"
                                value={capacity}
                                required="required"
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </Col>
                        <Col className="my-1 text-center">
                            <hr />
                            <Row className="justify-content-around">
                                <Form.Label className="text-center">
                                    جایزه(امتیاز)
                                </Form.Label>
                            </Row>
                            <hr />
                            <Form.Control
                                type="number"
                                className="account-info-textbox animated-textbox text-center"
                                placeholder="جایزه"
                                value={prize}
                                required="required"
                                onChange={(e) => setPrize(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Form>
    );
};

export default LeaguesManager;
