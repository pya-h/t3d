import MatchesTable from "./matches/MatchesTable";
import { Tab, Tabs, Card, Badge } from "react-bootstrap";
import Rankings from "../tables/rankings/Rankings";
import { toHijri } from "../tools/format";

const LeagueHome = ({ children }) => {

    return (
        <Card
            border="primary"
            bg="transparent"
            className="single-league-card mx-0 px-0"
        >
            {children && (
                <Card.Body>
                    <div className="w-100 text-center">
                        <Badge pill variant="primary" className="p-2 px-5">
                            دور {+children.round + 1} :{" "}
                            {children.ongoing.length
                                ? toHijri(children?.ongoing[0].schedule)[0]
                                : ""}
                        </Badge>
                    </div>
                    <Tabs
                        defaultActiveKey="draws"
                        variant="pills"
                        // transition={Fade}
                        className="mb-3"
                    >
                        <Tab eventKey="draws" title="بازی ها">
                            <hr />
                            <MatchesTable ongoing={children.ongoing} />
                        </Tab>
                        {children.mode && (
                            <Tab eventKey="table" title="جدول">
                                <hr />
                                <Rankings
                                    players={children.contesters}
                                    rankByProgress={true}
                                />
                            </Tab>
                        )}
                        <Tab eventKey="details" title="جزییات">
                            <hr />
                        </Tab>
                    </Tabs>
                </Card.Body>
            )}
        </Card>
    );
};
export default LeagueHome;
