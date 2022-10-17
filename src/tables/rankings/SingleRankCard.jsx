import { useSelector } from 'react-redux';
const SingleRankCard = ({rowNumber, playerID, name, records }) => {
    const me = useSelector(state => state.me);

    return (
        <tr className={!me || playerID !== me.userID ? "" : "bg-success"}>
            <th scope="row">{rowNumber}</th>
            <td>{name}</td>
            <td>{records.points}</td>
            <td>{records.wins}</td>
            <td>{records.loses}</td>
            <td>{records.draws}</td>
        </tr>
    );
};

export default SingleRankCard;
