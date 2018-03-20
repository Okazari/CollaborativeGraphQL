import koaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { execute, subscribe } from 'graphql';
import Config from '../config';
import schema from '../graphql';

const router = new koaRouter();
const graphql = { execute, schema, subscribe };

router.get(Config.api.base, ctx => ctx.body = `${Config.app.name} ${Config.app.version} ${Config.app.env}`);
router.post(Config.api.graphql, graphqlKoa({ schema }));
router.get(Config.api.graphql, graphqlKoa({ schema }));

if(Config.app.env === 'dev') {
    router.get(Config.api.graphiql, graphiqlKoa({
        endpointURL: Config.api.graphql,
        subscriptionsEndpoint: `ws://${Config.app.host}:${Config.app.websocket}${Config.api.subscriptions}`,
    }));
}

export {
    router,
    graphql,
};