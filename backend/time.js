const moment = require('moment');

const Time = () => (
    moment(new Date().getTime()).format('h:mm a')
);

module.exports = { Time };
