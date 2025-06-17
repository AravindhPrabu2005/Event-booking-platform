const { Kafka } = require('kafkajs')

const kafka = new Kafka({ clientId: 'gateway', brokers: ['localhost:9092'] })
const producer = kafka.producer()

const connectProducer = async () => {
  await producer.connect()
}

module.exports = { producer, connectProducer }
