import PubSub from 'pubsub-js';
import { UiChange, UiChangeHandler } from './types';
import { UI_CHANGE } from '../topics';

function publishUiChange(payload: UiChange) {
  PubSub.publish(UI_CHANGE, payload);
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
