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

    /**
     * Creates a new logger.
     * @param prefix The prefix to apply to the logger.
     */
    constructor(prefix?: string) {
        this.prefix = prefix;
    }

    private _log(type: LoggingType, consoleFunc: any, template: string, args?: any) {
        const formattedTemplate = format(template, args);
        const logLine = chalk
            `{gray 「${moment().format('HH:mm:ss')}」${this.prefix ? ` 「${this.prefix}」` : ''}} ${type.color(`${type.badge} ${type.label}`)}${' '.repeat(8 - type.label.length)}${formattedTemplate}`;

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