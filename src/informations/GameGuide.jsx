import './info.css'
import { Card } from 'react-bootstrap';

const GameGuide = () => {
    return ( 
        <Card border="warning" className="simple-single-card" >
            <Card.Header className="text-center">راهنمای بازی</Card.Header>
            <Card.Body className="text-right">
                <Card.Text>دانشگاه علم و صنعت ایران</Card.Text>
                <Card.Text>E-mail: <a href="https://mail.google.com">thcplusplus@gmail.com</a></Card.Text>
                <Card.Text>Phone Number: 0000000000000</Card.Text>
                <Card.Text>اطلاعات تماس استاد</Card.Text>
                <Card.Text>instagram: ......</Card.Text>
                <Card.Text>blah blah blah</Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default GameGuide;