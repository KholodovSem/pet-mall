import Winston from "winston";

const logger = Winston.createLogger({
    level: "info",
    format: Winston.format.json(),
    defaultMeta: { service: "logger" },
    transports: [new Winston.transports.Console()],
});
