import PubSub from 'pubsub-js';
import { CONTROL } from '../topics';
import { ControlChange, ControlChangeHandler } from './types';

function publishControlChange(data: ControlChange) {
  PubSub.publish(CONTROL, data);
}

class ControlChangeSubscriber {
  private subscription: string;

  constructor(controlChangeHandler: ControlChangeHandler) {
    this.subscription = PubSub.subscribe(
      CONTROL,
      controlChangeHandler,
    );
  }

  public unsubscribe() {
    PubSub.unsubscribe(this.subscription);
  }
}

export {
  publishControlChange,
  ControlChangeSubscriber
};

