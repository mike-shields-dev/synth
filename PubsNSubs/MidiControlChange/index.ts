import PubSub from 'pubsub-js';
import { MidiControlChange, MidiControlChangeHandler } from './types';

function publishMidiControlChange(payload: MidiControlChange) {
  PubSub.publish('midiControlChange', payload);
}

class MidiControlChangeSubscriber {
  private subscription: string;

  constructor(controlChangeHandler: MidiControlChangeHandler) {
    this.subscription = PubSub.subscribe(
      'midiControlChange',
      controlChangeHandler,
    );
  }

  public unsubscribe() {
    PubSub.unsubscribe(this.subscription);
  }
}

export {
  publishMidiControlChange,
  MidiControlChangeSubscriber
};
