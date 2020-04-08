# Untitled Logging Library
An elegant logging library for TypeScript projects. Now without the goose.

# Description
Untitled Logging Library (ULL) is an easy to use, zero configuration logging library with a beautiful format and elegant templating system. It is designed to be a simple drop-in
replacement for `console.log` to provide easier to read logging.

# Example
```typescript
import Logger from 'untitled-logging-library';

const myLogger = new Logger('my logger'); // prefix is optional

myLogger.info('Hello!'); // no templating
myLogger.debug('User {username} logged in using {method}', { username: 'demo', method: 'Google' }); // elegant templating!
```
> Using the templating is completely optional. If you want, you can use template literals as well.

# Formatting
You can pass an optional format to `Logger`. The keywords you can use are as follows:
- `{time}` - The current 24 hour time
- `{prefix}` - The prefix. If you are not setting one, leave this keyword out.
- `{level}` - The log level and figure (icon).
- `{padding}` - The padding between the message and log level to line up messages.
- `{message}` - The message itself.

The default format is defined as follows:
```typescript
new Logger(null, `${chalk.gray('「{time}」')} {level}{padding}{message}`);
new Logger('with prefix', `${chalk.gray('「{time}」 「{prefix}」')} {level}{padding}{message}`);
```
You will have to install Chalk as a seperate dependency to add color. Unfortunately, using Chalk template literals doesn't work because of how ULL does keywords and how it
does not support calling the tag function directly.