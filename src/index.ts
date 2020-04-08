import loggingTypes, { LoggingType } from './logging-types';

import chalk from 'chalk';
import moment from 'moment';

function format(template: string, args?: any) {
    if (!args)
        return template;

    for (const name in args)
        template = template.replace(new RegExp('\\{' + name + '\\}', 'gi'), args[name]);

    return template;
}

/**
 * A logger.
 */
class Logger {
    private prefix: string;
    private format: string;

    /**
     * Creates a new logger.
     * @param prefix The prefix to apply to the logger.
     */
    constructor(prefix?: string, format?: string) {
        this.prefix = prefix;

        if (!format) {
            if (this.prefix) {
                this.format = `${chalk.gray('「{time}」 「{prefix}」')} {level}{padding}{message}`;
            } else {
                this.format = `${chalk.gray('「{time}」')} {level}{padding}{message}`;
            }
        } else {
            this.format = format;
        }
    }

    private _log(type: LoggingType, consoleFunc: any, template: string, args?: any) {
        const formattedTemplate = format(template, args);
        const processedFormat = this.format
                .replace(/\{time\}/gi, moment().format('HH:mm:ss'))
                // prefix is null but the default formats don't have it
                .replace(/\{prefix\}/gi, this.prefix)
                .replace(/\{level\}/gi, type.color(`${type.badge} ${type.label}`))
                .replace(/\{padding\}/gi, ' '.repeat(8 - type.label.length))
                .replace(/\{message\}/gi, formattedTemplate);

        // use chalk to process the format
        const logLine = processedFormat;

        // and write it
        consoleFunc(logLine);
    }

    /**
     * Logs a fatal message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    fatal(template: string, args?: any) {
        this._log(loggingTypes.fatal, console.error, template, args);
    }

    /**
     * Logs an error message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    error(template: string, args?: any) {
        this._log(loggingTypes.error, console.error, template, args);
    }

    /**
     * Logs a warning message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    warn(template: string, args?: any) {
        this._log(loggingTypes.warn, console.warn, template, args);
    }

    /**
     * Logs a success message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    success(template: string, args?: any) {
        this._log(loggingTypes.success, console.info, template, args);
    }

    /**
     * Logs a information message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    info(template: string, args?: any) {
        this._log(loggingTypes.info, console.info, template, args);
    }

    /**
     * Logs a debug message.
     * @param template A message template.
     * @param args Optional arguments for the message.
     */
    debug(template: string, args?: any) {
        this._log(loggingTypes.debug, console.debug, template, args);
    }
}

export default Logger;