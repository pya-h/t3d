const isErrorExpected = (error) => {
    return (
        error.response &&
        error.response.status >= 400 && // >= : bad request
        error.response.status <= 500 // <= 500: internal server error
    );
    // other errors are not expected
};

module.exports = {
    Successful: 200,
    CreatedSuccessfully: 201,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    Conflict: 409,
    SessionExpired: 420,
    UnprocessableEntity: 422,
    LeagueNotFound: 432,
    MatchNotFound: 433,
    NotStartedYet: 434,
    GameEnded: 435,
    NonSenseToken: 465,
    ForgedToken: 466,
    InternalServerError: 500,
    isErrorExpected,
};