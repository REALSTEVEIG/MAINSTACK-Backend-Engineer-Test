import morgan from 'morgan';
import chalk from 'chalk';
import { type RequestHandler } from 'express';
import { type IncomingMessage, type ServerResponse } from 'http';

const requestLogger = (): RequestHandler<
  IncomingMessage,
  ServerResponse<IncomingMessage>
> =>
  morgan((tokens, req, res) => {
    const resStatus = res.statusCode;
    const result = [chalk.bgGreen.black(tokens.method(req, res))];
    if (resStatus >= 200 && resStatus < 300) {
      result.push(chalk.green.bold(tokens.status(req, res)));
    } else if (resStatus >= 300 && resStatus < 400) {
      result.push(chalk.yellow.bold(tokens.status(req, res)));
    } else if (resStatus >= 400 && resStatus < 500) {
      result.push(chalk.red.bold(tokens.status(req, res)));
    }
    result.push(
      chalk.yellow(tokens.url(req, res)),
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      chalk.blue(`${tokens['response-time'](req, res)} ms`),
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      chalk.magenta(`@ ${tokens.date(req, res)}`),
      chalk.yellow(tokens['remote-addr'](req, res)),
    );

    return result.join(' ');
  });

export default requestLogger;
