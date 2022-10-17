import { Card } from 'react-bootstrap';
import './info.css'

const ContactUs = () => {
    return ( 
        <Card border="dark" className="simple-single-card" >
            <Card.Header className="text-center">atlaaat tmas</Card.Header>
            <Card.Body className="text-left">
                <Card.Text>Iran University of Science and Technology</Card.Text>
                <Card.Text>E-mail: <a href="https://mail.google.com">thcplusplus@gmail.com</a></Card.Text>
                <Card.Text>Phone Number: 0000000000000</Card.Text>
                <Card.Text>atlaaat tmas astad</Card.Text>
                <Card.Text>instagram: ......</Card.Text>
                <Card.Text>blah blah blah</Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default ContactUs;