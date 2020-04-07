# Untitled Logging Library
An elegant logging library for TypeScript projects. Now without the goose.

# Description
Untitled Logging Library is an easy to use, zero configuration logging library with a beautiful format and elegant templating system. It is designed to be a simple drop-in
replacement for `console.log` to provide easier to read logging.

# Example
```typescript
import Logger from 'untitled-logging-library';

const myLogger = new Logger('my logger'); // prefix is optional

myLogger.info('Hello!'); // no templating
myLogger.debug('User {username} logged in using {method}', { username: 'demo', method: 'Google' }); // elegant templating!
```