import PubSub from 'pubsub-js';
import { UiControlChange, UiControlChangeHandler } from './types';

function publishUiControlChange(payload: UiControlChange) {
  PubSub.publish('uiControlChange', payload);
}

class UiControlChangeSubscriber {
  private subscription: string;

  constructor(controlChangeHandler: UiControlChangeHandler) {
    this.subscription = PubSub.subscribe(
      'UiControlChange',
      controlChangeHandler,
    );
  }

  public unsubscribe() {
    PubSub.unsubscribe(this.subscription);
  }
}

export {
  publishUiControlChange,
  UiControlChangeSubscriber
};
