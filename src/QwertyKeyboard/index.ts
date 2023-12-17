import { publishNoteOff, publishNoteOn, publishOctaveChange } from "../PubSub";
import { maxOctave, minOctave, octave } from "../Synth/index";

type map = {
  [key: string]: number;
}

const keyValues: map = {
  A: 60,
  W: 61,
  S: 62,
  E: 63, 
  D: 64, 
  F: 65,
  T: 66,
  G: 67,
  Y: 68,
  H: 69,
  U: 70,
  J: 71,
  K: 72,
  O: 73, 
  L: 74,
  P: 75,
}

function onKeyDown(event: KeyboardEvent): void {
  if(event.repeat) return;
  
  const { key } = event;
  const noteNumber = keyValues[key];
  
  if(noteNumber) {
    return publishNoteOn({ noteNumber, velocity: 80, });
  }
}

function onKeyUp(event: KeyboardEvent): void {
  const { key } = event;
  const noteNumber = keyValues[key];
  
  if(noteNumber) {
    return publishNoteOff({ noteNumber });
  }

  if(key === "Z") {
      publishOctaveChange(octave - 1)
  }

  if(key === "X") {
      publishOctaveChange(octave + 1)
  }
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);