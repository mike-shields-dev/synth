import PubSub from 'pubsub-js';
import { CONTROL } from '../topics';

interface ControlChange {
  controlChangeNumber: number;
  value: number;
}

type ControlChangeHandler = (message: string, data: ControlChange) => void;

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

export type { ControlChange };

