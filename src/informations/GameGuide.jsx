import "./info.css";
import { Card } from "react-bootstrap";

const GameGuide = () => {
	return (
		<Card border="info" className="simple-single-card">
			<Card.Header className="text-center">
				3D Tic-Tac-Toe — How to Play
			</Card.Header>
			<Card.Body className="text-left" style={{ lineHeight: "1.9rem" }}>
				<Card.Text className="my-3 mx-4">
					The board is a cube of N×N×N cells. Pick a size: 3×3×3,
					4×4×4, or 5×5×5. Two players take turns placing their mark
					(X or O).
				</Card.Text>
				<Card.Text className="my-3 mx-4">
					Unlike flat tic-tac-toe, you score by completing straight
					lines of N cells anywhere in the cube: along rows, columns
					and verticals, plus the 2D diagonals on each floor and the
					3D diagonals that run through the whole cube.
				</Card.Text>
				<Card.Text className="my-3 mx-4">
					<strong>Scored mode:</strong> play until the cube fills up.
					Every completed line is worth one point, and the player with
					more points wins. <strong>Speed mode:</strong> the first
					player to complete any line wins immediately.
				</Card.Text>
				<Card.Text className="my-3 mx-4">
					Each turn has a 45-second limit; if you run out of time your
					turn is skipped. A win earns 3 points, a draw 1 point, and a
					loss 0.
				</Card.Text>
				<Card.Text className="my-3 mx-4">
					Ways to play: jump into a Random match, invite a Friend, join
					a League, or practice Single-player against the AI (Easy,
					Medium, or Hard).
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default GameGuide;
