import { Fragment, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import LoadingBar from "../commons/LoadingBar";
import { Attention, Notify, OK } from "../tools/notification";
import {
    CloseRandomSearch,
    RepeatRandomSearch,
} from "../globals/redux/actions/tools";
import { EnterRoom } from "../globals/redux/actions/game";
import GlobalContext from "../globals/state/GlobalContext";
import { Routes } from "../services/configs";
const RandomGame = () => {
    const [dimension, setDimension] = useState(4);
    const [isScoreless, setScoreless] = useState(false);
    const me = useSelector((state) => state.me);
    const [searching, setSearching] = useState(false);
    const context = useContext(GlobalContext);
    const dispatch = useDispatch();
    const tools = useSelector((state) => state.tools);
    const room = useSelector((state) => state.room);

    const onStartGameClick = (event) => {
        event.preventDefault();
        if (me) {
            dispatch(
                EnterRoom({
                    name: null,
                    type: dimension,
                    scoreless: isScoreless,
                })
            );
            dispatch(RepeatRandomSearch());
            setSearching(true);
        }
        // random game:
        else {
            Attention("ابتدا باید وارد حساب کاربری خود شوید");
            context.goTo(Routes.Client.SignUp);
        }
    };
    const { randomSearchRepeats } = tools;

    useEffect(() => {
        if (searching) {
            if (room.name) {
                OK(
                    "یک حریف تصادفی پیدا شد ... در صورت تایید هر دو طرف بازی آغاز خواهد شد."
                );
                setSearching(false);
            } else if (!randomSearchRepeats) {
                //means no one has been found after a specific amount of time
                Notify("حریفی پیدا نشد ... لحظاتی دیگر مجددا تلاش کنید");
                setSearching(false);
            }
        }
    }, [searching, room.name, randomSearchRepeats]);
    //on destroy
    useEffect(() => {
        return () => {
            setSearching(false); //make sure preloader turns off
            dispatch(CloseRandomSearch());
        };
    }, [dispatch]);

    return (
        <Fragment>
            <LoadingBar loading={searching} />
            <hr />
            <Form onSubmit={(event) => onStartGameClick(event)}>
                <Form.Group className="form-inline">
                    <Form.Label className="pb-2 w-25">نوع بازی</Form.Label>
                    <InputGroup
                        style={{
                            border: "1px solid orange",
                            borderRadius: "5px",
                            padding: "2%",
                        }}
                    >
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="0"
                                name="scoreless"
                                checked={!isScoreless}
                                onChange={() => setScoreless(false)}
                            />
                            <InputGroup.Text>امتیازی</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="1"
                                name="scoreless"
                                checked={isScoreless}
                                onChange={() => setScoreless(true)}
                            />
                            <InputGroup.Text>سرعتی</InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="form-inline">
                    <Form.Label className="pb-2 w-25">ابعاد جدول</Form.Label>
                    <InputGroup
                        style={{
                            border: "1px solid orange",
                            borderRadius: "5px",
                            padding: "2%",
                        }}
                    >
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="3"
                                name="tableDimension"
                                checked={dimension === 3}
                                onChange={() => setDimension(3)}
                            />
                            <InputGroup.Text>3 * 3 * 3</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="4"
                                name="tableDimension"
                                checked={dimension === 4}
                                onChange={() => setDimension(4)}
                            />
                            <InputGroup.Text>4 * 4 * 4</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="5"
                                name="tableDimension"
                                checked={dimension === 5}
                                onChange={() => setDimension(5)}
                            />
                            <InputGroup.Text>5 * 5 * 5</InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>
                <hr />
                <Button
                    type="submit"
                    className="mt-4 animated-button"
                    block
                    variant="success"
                >
                    <i className="fa fa-search px-2" aria-hidden="true"></i>
                    جستجو
                </Button>
            </Form>
        </Fragment>
    );
};

export default RandomGame;
