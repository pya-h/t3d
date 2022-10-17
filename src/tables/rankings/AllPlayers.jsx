import { Card } from "react-bootstrap";
import SinglePlayerCard from "./SinglePlayerCard";

const AllPlayers = ({ players }) => {
    return (
        <Card border="dark" style={{ width: "100%", borderRadius: "5px" }}>
            <Card.Header className="text-center">رده بندی</Card.Header>
            <table className="table table-striped table-bordered table-hover text-center">
                <thead className="bg-info">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">نام بازیکن</th>
                        <th scope="col">امتیاز</th>
                        <th scope="col">تعداد برد</th>
                        <th scope="col">تعداد باخت</th>
                        <th scope="col">تعداد تساوی</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <SinglePlayerCard
                            key={player.userID}
                            rowNumber={
                                players.findIndex(
                                    (p) => p.userID === player.userID
                                ) + 1
                            }
                            name={player.fullname}
                            points={player.records.points}
                            wins={player.records.wins}
                            loses={player.records.loses}
                            draws={player.records.draws}></SinglePlayerCard>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default AllPlayers;
