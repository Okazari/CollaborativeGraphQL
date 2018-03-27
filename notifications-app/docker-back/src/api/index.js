import koaRouter from 'koa-router';
import Config from '../config';
import { Docker } from 'node-docker-api';

const router = new koaRouter();
const docker = new Docker({ socketPath: Config.docker.socketPath });

router.get(Config.api.base, ctx => ctx.body = `${Config.app.name} ${Config.app.version} ${Config.app.env}`);
router.get(Config.api.containers, ctx => 
    docker.container.list()
        .then(containers => {
            const response = containers.reduce((backs, { data }) => {
                if (data.Labels.hasOwnProperty('bzhcmp.backend')) {
                    const ports = {};
                    data.Ports.forEach(port => {
                        if (port.PrivatePort === Config.docker.bakendHttpPrivatePort) {
                            return ports.http = port.PublicPort;
                        } else if (port.PrivatePort === Config.docker.bakendWsPrivatePort) {
                            return ports.ws = port.PublicPort;
                        }
                    });
                    backs.push({
                        name: data.Names[0].slice(1,data.Names[0].length),
                        ports, 
                    });
                }
                return backs;
            }, []);
            ctx.body = response;
        })
);

export {
    router,
};