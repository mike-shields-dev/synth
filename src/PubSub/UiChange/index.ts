import PubSub from 'pubsub-js';
import { UI_CHANGE } from '../topics';
import { UiChange, UiChangeHandler } from './types';

function publishUiChange(data: UiChange) {
  PubSub.publish(UI_CHANGE, data);
}

class UiChangeSubscriber {
  private subscription: string;

  constructor(handler: UiChangeHandler) {
    this.subscription = PubSub.subscribe(
      UI_CHANGE,
      handler,
    );
  }

  public unsubscribe() {
    PubSub.unsubscribe(this.subscription);
  }
}

export {
  publishUiChange,
  UiChangeSubscriber
};

