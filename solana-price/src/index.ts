import WebSocket from "ws";

import { producer } from "./kafka";
import { handleSolanaPrice } from "./kafka/handlers";

const ws = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@ticker");

ws.on("open", () => {
    console.log("Connection open");
});

ws.on("message", async (data) => {
    const lastPrice = JSON.parse(data.toString()).c;

    // console.log(
    //     `Last price: ${lastPrice}
    //     `
    // );

    handleSolanaPrice(lastPrice);
});

ws.on("error", (err) => {
    console.error(
        `Error: 
        ${err}
        `
    );
});

ws.on("close", function close() {
    console.log("Connection close");
});

process.on("SIGINT", async () => {
    producer.disconnect();
    process.exit(0);
});
