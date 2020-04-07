import chalk, { Chalk } from 'chalk';
import figures from 'figures';

type LogLevel = 'fatal' | 'error' | 'warn' | 'success' | 'info' | 'debug';
type LoggingTypes = {
    [key in LogLevel]: LoggingType;
}

export interface LoggingType {
    badge: string;
    color: Chalk;
    label: string;
}

export default {
    fatal: {
        badge: figures.cross,
        color: chalk.redBright,
        label: 'fatal'
    },
    error: {
        badge: figures.cross,
        color: chalk.red,
        label: 'error'
    },
    warn: {
        badge: figures.warning,
        color: chalk.yellow,
        label: 'warning'
    },
    success: {
        badge: figures.tick,
        color: chalk.green,
        label: 'success'
    },
    info: {
        badge: figures.info,
        color: chalk.blue,
        label: 'info'
    },
    debug: {
        badge: figures.bullet,
        color: chalk.gray,
        label: 'debug'
    }
} as LoggingTypes;