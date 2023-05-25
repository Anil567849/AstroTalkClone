import { Kafka } from 'kafkajs';
import {io} from '../socket/socket.js';

  const kafka = new Kafka({
      clientId: 'my-first-kafka-app',
      brokers: ['localhost:9092'],
  })

const producer = kafka.producer();

// Function to send messages to Kafka
const sendMessage = async (topic, message) => {
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    await producer.disconnect();
  }
};

const consumer = kafka.consumer({ groupId: 'my-group' });

// Function to consume messages from Kafka
const consumeMessages = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log({
        //   value: message.value.toString(),
        // });
        console.log('kafka msg', message.value.toString());
        io.emit('newKafkaMsgReceived', message.value.toString());
      },
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
};


export {sendMessage, consumeMessages};