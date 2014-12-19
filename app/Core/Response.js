/**
 * Response object
 * Object returns by the API
 *
 * @type {{}}
 */
var Response = {
    /**
     * Default Response types of the API with their HTTP status code and default message
     */
    types: {
        // All it's fine, and if there are data, it will be returned
        OK:           { status: 200, message: 'OK' },
        // There is no data to return for this request
        NO_RESULT:    { status: 200, message: 'No result' },
        // Something has been updated and all it's OK, we will return the updated data
        UPDATED:      { status: 200, message: 'Updated' },
        // Something has been created and all it's OK, we will return the created data
        CREATED:      { status: 201, message: 'Created' },
        // Accepted but is being processed async
        ACCEPTED:     { status: 202, message: 'Accepted' },
        // Bad request (syntax)
        BAD_REQUEST:  { status: 400, message: 'Bad Request' },
        // Invalid data have been posted
        INVALID:      { status: 400, message: 'Invalid Data' },
        // The requested URL or the resource can not be found
        NOT_FOUND:    { status: 404, message: 'Not found' },
        // No current user and there should be
        UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
        // The current user is forbidden from accessing this data
        FORBIDDEN:    { status: 403, message: 'Forbidden' },
        // Something goes wrong with the server
        SERVER_ERROR: { status: 500, message: 'Internal Server Error' },
        // API is not here right now, please try again later
        UNAVAILABLE:  { status: 503, message: 'Service Unavailable' }
    },

    /**
     * Create a basic response containing a status and message
     *
     * @param {{}}    type    - a valid type listed in Response.types OR an object containing a status (default: 200) and message property
     * @param {mixed} message - a custom message
     * @returns {{}}
     */
    createResponse: function (type, message) {
        if (!type) {
            type = this.types.OK;
        }

        var response = {
            status: type.status ? type.status : 200,
            message: message ? message : (type.message ? type.message : '')
        };

        return response;
    },

    /**
     * Create a response containing a status
     *
     * @param type
     * @param data
     * @param message
     * @returns {{}}
     */
    createDataResponse: function (type, data, message) {
        var response = this.createResponse(type, message);

        // Add data to response
        response.data = data ? data : [];

        return response;
    },

    /**
     * Default OK function
     *
     * @constructor
     * @param   {*}  [message] - a custom message
     * @returns {{}}           - the response object containing status code and message
     */
    Default: function (message) {
        return Response.createResponse(Response.types.OK, message);
    },

    /**
     * Accepted Response
     *
     * @constructor
     * @param   {*}  [message] - a custom message
     * @returns {{}}           - the response object containing status code and message
     */
    Accepted: function (message) {
        return Response.createResponse(Response.types.ACCEPTED, message);
    },

    /**
     * Data Response
     *
     * Used when data manipulation occurred (e.g. list, get, create)
     * Contains a status code, a message, some data
     */
    Data: {
        /**
         * Data Item Response
         *
         * @constructor
         * @param   {{}} data      - the data item
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code, message and the item
         */
        Item: function (data, message) {
            return Response.createDataResponse(Response.types.OK, data ? data : {}, message);
        },

        /**
         * Data Collection Response
         *
         * @constructor
         * @param   {array} data      - the data collection
         * @param   {*}     [message] - a custom message
         * @returns {{}}              - the response object containing status code, message and the collection
         */
        Collection: function (data, message) {
            return Response.createDataResponse(Response.types.OK, data ? data : [], message);
        },

        /**
         * No Data Result Response
         *
         * @constructor
         * @param   {*} [message] - a custom message
         * @returns {{}}          - the response object containing status code, message and empty array
         */
        NoResult: function (message) {
            return Response.createDataResponse(Response.types.NO_RESULT, [], message);
        },

        /**
         * Data Not Found
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code, message
         */
        NotFound: function (message) {
            return Response.createResponse(Response.types.NOT_FOUND, (message ? message : 'Data Not Found'));
        },

        /**
         * Created Data Response
         *
         * @constructor
         * @param   {{}} data      - the created data
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code, message, and created data
         */
        Created: function (data, message) {
            return Response.createDataResponse(Response.types.CREATED, data ? data : {}, message);
        },

        /**
         * Updated Data Response
         *
         * @constructor
         * @param   {{}} data      - the updated data
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code, message, and updated data
         */
        Updated: function (data, message) {
            return Response.createDataResponse(Response.types.UPDATED, data ? data : {}, message);
        },

        /**
         * Invalid Data Response
         *
         * @constructor
         */
        Invalid: function (data, errors, message) {
            return Response.createDataResponse(Response.types.INVALID, data, message);
        }
    },

    /**
     * Error Responses
     *
     * Used when something goes wrong (e.g. internal error, bar request form the client)
     * Contains a status code and a message
     */
    Error: {
        /**
         * Not Found Response
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code and message
         */
        NotFound: function (message) {
            return Response.createResponse(Response.types.NOT_FOUND, message);
        },

        /**
         * Unauthorized Response
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code and message
         */
        Unauthorized: function (message) {
            return Response.createResponse(Response.types.UNAUTHORIZED, message);
        },

        /**
         * Forbidden Response
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code and message
         */
        Forbidden: function (message) {
            return Response.createResponse(Response.types.FORBIDDEN, message);
        },

        /**
         * Internal Server Error Response
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code and message
         */
        Internal: function (message) {
            return Response.createResponse(Response.types.SERVER_ERROR, message);
        },

        /**
         * Service Unavailable Response
         *
         * @constructor
         * @param   {*}  [message] - a custom message
         * @returns {{}}           - the response object containing status code and message
         */
        Unavailable: function (message) {
            return Response.createResponse(Response.types.UNAVAILABLE, message);
        }
    }
};

module.exports = Response;