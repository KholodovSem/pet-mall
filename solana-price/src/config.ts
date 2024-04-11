export const config = {
    kafka: {
        host: process.env.KAFKA_HOST || "localhost",
        port: process.env.KAFKA_PORT || "9092",
    },
};
