import { Card } from 'react-bootstrap';
const NoItems = ({children}) => {
	return (
		<Card className="bg-transparent mx-auto mt-3" border="danger">
			<Card.Body className="text-center">
				<Card.Text>{children}.</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default NoItems;
