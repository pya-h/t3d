const SinglePlayerCard = ({rowNumber, name, points, wins, loses, draws }) => {
    return (
        <tr>
            <th scope="row">{rowNumber}</th>
            <td>{name}</td>
            <td>{points}</td>
            <td>{wins}</td>
            <td>{loses}</td>
            <td>{draws}</td>
        </tr>
    );
};

export default SinglePlayerCard;
