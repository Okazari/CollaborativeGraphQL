import Koa from 'koa';
import KoaBody from 'koa-body';
import Cors from '@koa/cors';
import Logger from 'koa-logger';
import asciify from 'asciify';
import Config from './config';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { router, graphql } from './api';

const app = new Koa();
const ws = createServer(app.callback());

app.use(new KoaBody());
app.use(new Logger());
app.use(new Cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(Config.app.port, () => {
    asciify(Config.app.name, {font: 'standard', color: 'blue'}, (err, res) => {
      console.log(res);
      console.log(`Version : ${Config.app.version}\nServer running on port ${Config.app.port}`);
      ws.listen(Config.app.websocket, () => {
        new SubscriptionServer(graphql, { server: ws, path: Config.api.subscriptions });
        console.log(`Websocket running on port ${Config.app.websocket}`);
      })
    });
});