const kafka = require('../config/kafka');

const consumer = kafka.consumer({ groupId: 'bookhive-group' });

const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topics: ['book-events', 'note-events'] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            
            switch (topic) {
                case 'book-events':
                    console.log(`📚 New book activity: ${data.username} added "${data.bookTitle}"`);
                    break;
                    
                case 'note-events':
                    console.log(`📝 New note activity: ${data.username} added a note to "${data.bookTitle}"`);
                    break;
            }
        },
    });
};

module.exports = { startConsumer }; 