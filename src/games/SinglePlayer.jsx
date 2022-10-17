import { Form } from "react-bootstrap";
import { Fragment, useContext } from "react";
import { InputGroup } from "react-bootstrap";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { RegisterSinglePlayer } from "./../globals/redux/actions/game";
import GlobalContext from "./../globals/state/GlobalContext";
import { Routes } from "../services/configs";
import ArtificialIntelligence from "./gameplay/ArtificialIntelligence";
const SinglePlayer = () => {
    // This game is a game between a player and the artificial intelligense
    const [dimension, setDimension] = useState(4);
    const [isScoreless, setScoreless] = useState(false);
    const [difficulty, setDifficulty] = useState(1);
    const dispatch = useDispatch();
    const context = useContext(GlobalContext);

    const onStartSinglePlayerClick = async (event) => {
        event.preventDefault();
        try {
            await dispatch(
                RegisterSinglePlayer(dimension, isScoreless, difficulty)
            );
            context.goTo(Routes.Client.SingleGameplay);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Fragment>
            <hr />
            <Form onSubmit={(event) => onStartSinglePlayerClick(event)}>
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
                <Form.Group className="form-inline">
                    <Form.Label className="pb-2 w-25">درجه سختی</Form.Label>
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
                                name="difficulty"
                                checked={
                                    difficulty ===
                                    ArtificialIntelligence.LEVELS.Noob
                                }
                                onChange={() =>
                                    setDifficulty(
                                        ArtificialIntelligence.LEVELS.Noob
                                    )
                                }
                            />
                            <InputGroup.Text>راحت</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="1"
                                name="difficulty"
                                checked={
                                    difficulty ===
                                    ArtificialIntelligence.LEVELS.Ordinary
                                }
                                onChange={() =>
                                    setDifficulty(
                                        ArtificialIntelligence.LEVELS.Ordinary
                                    )
                                }
                            />
                            <InputGroup.Text>
                                متوسط
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend className="mx-3">
                            <InputGroup.Radio
                                value="1"
                                name="difficulty"
                                checked={
                                    difficulty ===
                                    ArtificialIntelligence.LEVELS.Pro
                                }
                                onChange={() =>
                                    setDifficulty(
                                        ArtificialIntelligence.LEVELS.Pro
                                    )
                                }
                            />
                            <InputGroup.Text>سخت</InputGroup.Text>
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
                    <i
                        className="fa fa-street-view px-2"
                        aria-hidden="true"
                    ></i>
                    شروع بازی
                </Button>
            </Form>
        </Fragment>
    );
};
export default SinglePlayer;
