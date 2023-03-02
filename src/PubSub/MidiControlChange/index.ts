import PubSub from 'pubsub-js';
import { MIDI_CC } from '../topics';
import { MidiControlChange, MidiControlChangeHandler } from './types';

function publishMidiControlChange(payload: MidiControlChange) {
  PubSub.publish(MIDI_CC, payload);
}

class MidiControlChangeSubscriber {
  private subscription: string;

  constructor(controlChangeHandler: MidiControlChangeHandler) {
    this.subscription = PubSub.subscribe(
      MIDI_CC,
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
