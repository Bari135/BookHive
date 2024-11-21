const kafka = require('../config/kafka');

const producer = kafka.producer();

const produceMessage = async (topic, message) => {
    try {
        await producer.connect();
        await producer.send({
            topic,
            messages: [
                { value: JSON.stringify(message) },
            ],
        });
    } catch (error) {
        console.error('Error producing message:', error);
    }
};

module.exports = { produceMessage }; 