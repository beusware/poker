import * as path from "path";

export const HTTP_PORT = 8080;
export const HTTPS_PORT = 8443;

export const paths = {
    viewsDirectory: path.resolve(`${__dirname}/../../frontend/dist/views/`),
    logicDirectory: path.resolve(`${__dirname}/../../frontend/dist/logic/`),
    staticDirectory: path.resolve(`${__dirname}/../../frontend/static/`),
    certificateDirectory: path.resolve(`${__dirname}/../certificates/`),
}
