import * as amqp from 'amqplib/callback_api'

export interface PubMessageContent {
  id: string;
  [propName: string]: any;
}

export interface PubMessage {
  event: string;
  content: PubMessageContent;
  action: string;
}

export class RabbitPub {

  private _ch: amqp.Channel;
  private EX = 'realtime_exchange_v2';

  private static _instance: RabbitPub = new RabbitPub();

  constructor() {
    if (RabbitPub._instance) {
      throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
    }
    this.connect();
    RabbitPub._instance = this;
  }

  public static getInstance(): RabbitPub {
    return RabbitPub._instance;
  }

  public connect(): void {
    let rabbitURL = process.env.RABBIT_URL || 'amqp://usr:pwd@localhost';
    amqp.connect(rabbitURL, (err, conn) => {
      if (err) {
        console.error(err);
        console.error('=> Rabittmq could not start');
      } else if (conn) {
        conn.createChannel((err, ch) => {
          if (err) console.error(err);
          ch.assertExchange(this.EX, 'fanout', {durable: true}, (err, ok) => {
            if (err) console.error(err);
            this._ch = ch;
          });
        });
      }
    });
  }

  public pub(msg: PubMessage) {
    if (!this._ch) return;
    const routingKey = msg.content.id.toString();

    // console.log(routingKey);
    this._ch.publish(this.EX, routingKey, Buffer.from(JSON.stringify(msg), 'utf8'));
  }
}


// setTimeout(function() { conn.close(); process.exit(0) }, 500);
