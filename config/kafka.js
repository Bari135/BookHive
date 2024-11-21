const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'bookhive',
    brokers: ['localhost:9092']  // Update this with your Kafka broker address
});

module.exports = kafka; 