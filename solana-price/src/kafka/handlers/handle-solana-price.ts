import { producer } from "../";

export const handleSolanaPrice = async (price: string) => {
    await producer.connect();
    await producer.send({
        topic: "solana_price",
        messages: [
            {
                value: price,
            },
        ],
    });
};
