import PubSub from 'pubsub-js';
import { MidiControlChange, MidiControlChangeHandler } from '../MidiControlChange/types';
import { UI_CC } from '../topics';


function publishUiControlChange(data: MidiControlChange) {
  PubSub.publish(UI_CC, data);
}

class UiControlChangeSubscriber {
  private subscription: string;

  constructor(handler: MidiControlChangeHandler) {
    this.subscription = PubSub.subscribe(
      UI_CC,
      handler,
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

