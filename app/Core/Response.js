/**
 * Response object
 * Object returns by the API
 *
 * @type {{}}
 */
var Response = {
    /**
     * Default Response status of the API with their HTTP status code and default message
     */
    status: {
        // All it's fine, and if there are data, it will be returned
        OK:           { code: 200, message: 'OK' },
        // There is no data to return for this request
        NO_RESULT:    { code: 200, message: 'No result' },
        // Something has been updated and all it's OK, we will return the updated data
        UPDATED:      { code: 200, message: 'Updated' },
        // Something has been created and all it's OK, we will return the created data
        CREATED:      { code: 201, message: 'Created' },
        // Accepted but is being processed async
        ACCEPTED:     { code: 202, message: 'Accepted' },
        // Bad request (syntax)
        BAD_REQUEST:  { code: 400, message: 'Bad Request' },
        // Invalid data have been posted
        INVALID:      { code: 400, message: 'Invalid Data' },
        // The requested URL or the resource can not be found
        NOT_FOUND:    { code: 404, message: 'Not found' },
        // No current user and there should be
        UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
        // The current user is forbidden from accessing this data
        FORBIDDEN:    { code: 403, message: 'Forbidden' },
        // Something goes wrong with the server
        SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
        // API is not here right now, please try again later
        UNAVAILABLE:  { code: 503, message: 'Service Unavailable' }
    },

    /**
     * Create a basic response containing a status and message
     *
     * @param {object}    response  - the default HTTP response passed through NodeJS middleware
     * @param {object}    status    - a status type listed in Response.types OR an object containing a code (default: 200) and message property
     * @param {*}         [message] - a custom message
     *
     * @returns {object}
     */
    createResponse: function (response, status, message) {
        if (!status) {
            status = this.types.OK;
        }

        // Create body of the response
        var res = this.buildResponseBody(status, message);

        // Set Node response status
        response.statusCode =  res.status.code;

        return response.json(res);
    },

    /**
     * Create a response containing a status
     *
     * @param {object}           response  - the default HTTP response passed through NodeJS middleware
     * @param {object}           status    - a status type listed in Response.types OR an object containing a code (default: 200) and message property
     * @param {array|object}     data      - a data item or collection
     * @param {*}                [message] - a custom message
     *
     * @returns {object}
     */
    createDataResponse: function (response, status, data, message) {
        if (!status) {
            status = this.types.OK;
        }

        // Create body of the response
        var res = this.buildResponseBody(status, message, data ? data : []);

        // Set Node response status
        response.statusCode =  res.status.code;

        return response.json(res);
    },

    /**
     * Create the body of the response
     */
    buildResponseBody: function (status, message, data) {
        var response = {
            status: {
                code:    status.code ? status.code : 200,
                message: message ? message : (status.message ? status.message : '')
            }
        };

        if (data) {
            response.data = data;
        }

        return response;
    },

    /**
     * Default OK function
     *
     * @constructor
     * @param   {object} response  - the default HTTP response passed through NodeJS middleware
     * @param   {*}      [message] - a custom message
     *
     * @returns {object}           - the response object containing status code and message
     */
    Default: function (response, message) {
        return Response.createResponse(response, Response.status.OK, message);
    },

    /**
     * Accepted Response
     *
     * @constructor
     * @param   {object} response  - the default HTTP response passed through NodeJS middleware
     * @param   {*}      [message] - a custom message
     *
     * @returns {object}           - the response object containing status code and message
     */
    Accepted: function (response, message) {
        return Response.createResponse(response, Response.status.ACCEPTED, message);
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
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {object} data      - the data item
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code, message and the item
         */
        Item: function (response, data, message) {
            return Response.createDataResponse(response, Response.status.OK, data ? data : {}, message);
        },

        /**
         * Data Collection Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {array}  data      - the data collection
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code, message and the collection
         */
        Collection: function (response, data, message) {
            return Response.createDataResponse(response, Response.status.OK, data ? data : [], message);
        },

        /**
         * No Data Result Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code, message and empty array
         */
        NoResult: function (response, message) {
            return Response.createDataResponse(response, Response.status.NO_RESULT, [], message);
        },

        /**
         * Data Not Found
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code, message
         */
        NotFound: function (response, message) {
            return Response.createResponse(response, Response.status.NOT_FOUND, (message ? message : 'Data Not Found'));
        },

        /**
         * Created Data Response
         *
         * @constructor
         * @param   {object}       response  - the default HTTP response passed through NodeJS middleware
         * @param   {object|array} data      - the created data
         * @param   {*}            [message] - a custom message
         *
         * @returns {object}                 - the response object containing status code, message, and created data
         */
        Created: function (response, data, message) {
            return Response.createDataResponse(response, Response.status.CREATED, data ? data : {}, message);
        },

        /**
         * Updated Data Response
         *
         * @constructor
         * @param   {object}       response  - the default HTTP response passed through NodeJS middleware
         * @param   {object|array} data      - the updated data
         * @param   {*}            [message] - a custom message
         *
         * @returns {object}                 - the response object containing status code, message, and updated data
         */
        Updated: function (response, data, message) {
            return Response.createDataResponse(response, Response.status.UPDATED, data ? data : {}, message);
        },

        /**
         * Deleted Data Response
         *
         * @constructor
         * @param   {object}       response  - the default HTTP response passed through NodeJS middleware
         * @param   {object|array} data      - the updated data
         * @param   {*}            [message] - a custom message
         *
         * @returns {object}                 - the response object containing status code, message, and updated data
         */
        Deleted: function (response, data, message) {
            return Response.createDataResponse(response, Response.status.UPDATED, data ? data : {}, message);
        },

        /**
         * Invalid Data Response
         *
         * @constructor
         */
        Invalid: function (response, data, errors, message) {
            return Response.createDataResponse(response, Response.status.INVALID, data, message);
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
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code and message
         */
        NotFound: function (response, message) {
            return Response.createResponse(response, Response.status.NOT_FOUND, message);
        },

        /**
         * Unauthorized Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code and message
         */
        Unauthorized: function (response, message) {
            return Response.createResponse(response, Response.status.UNAUTHORIZED, message);
        },

        /**
         * Forbidden Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code and message
         */
        Forbidden: function (response, message) {
            return Response.createResponse(response, Response.status.FORBIDDEN, message);
        },

        /**
         * Internal Server Error Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code and message
         */
        Internal: function (response, message) {
            return Response.createResponse(response, Response.status.SERVER_ERROR, message);
        },

        /**
         * Service Unavailable Response
         *
         * @constructor
         * @param   {object} response  - the default HTTP response passed through NodeJS middleware
         * @param   {*}      [message] - a custom message
         *
         * @returns {object}           - the response object containing status code and message
         */
        Unavailable: function (response, message) {
            return Response.createResponse(response, Response.status.UNAVAILABLE, message);
        }
    }
};

module.exports = Response;