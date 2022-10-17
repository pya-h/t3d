import { Fragment } from "react";
import { Card } from "react-bootstrap";
import SingleScoreCard from "./SingleScoreCard";

const AllScores = ({scores}) => {
    return ( 
        <Fragment>
            { scores.length ? scores.map(score => (
                <SingleScoreCard key={score.gameID}
                    Type={score.Type}
                    date={score.date}
                    playerXName={score.players[0].name}
                    playerOName={score.players[1].name}
                    xScore={score.players[0].score}
                    oScore={score.players[1].score}
                ></SingleScoreCard>
            )) :
            <Card className="bg-transparent mx-auto mt-3" border="danger">
                <Card.Body className="text-center">
                    <Card.Text>
                        هیچ بازی ای انجام نگرفته است
                    </Card.Text>
                </Card.Body>
                </Card>}
        </Fragment>
     );
};
 
export default AllScores;