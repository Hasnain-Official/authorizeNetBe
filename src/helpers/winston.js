const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const log_configuration = {
    format: combine(
        label({label : `This might be important to you, please have a look into this log.`}),
        timestamp(),
        prettyPrint(),
    ),
    "transports" : [
            new transports.Console()
        ]
}
module.exports.logger = createLogger(log_configuration);