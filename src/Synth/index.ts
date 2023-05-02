import * as Tone from "tone";
import {
  ControlChange,
  ControlChangeSubscriber,
  NoteOff,
  NoteOffSubscriber,
  NoteOn,
  NoteOnSubscriber,
  OctaveChangeSubscriber,
  PitchBendSubscriber,
  FocusChangeSubscriber,
} from "../PubSub";
import * as scaler from "../utils/Scalers";

interface ScalerMap {
  [key: string]: (value: number) => void;
}

const SYNTH = new Tone.PolySynth(Tone.MonoSynth);
SYNTH.toDestination();
console.log(SYNTH.get());

let activeNotes: number[] = [];
let focus = "";
let octave = 0;
const minOctave = -5;
const maxOctave = 5;

new NoteOnSubscriber(onNoteOn);
new NoteOffSubscriber(onNoteOff);
new FocusChangeSubscriber(onFocusChange);
new ControlChangeSubscriber(onControlChange);
new OctaveChangeSubscriber(onOctaveChange);
new PitchBendSubscriber(onPitchBend);

function onNoteOn(topic: string, data: NoteOn) {
  const noteNumber = data.noteNumber + octave * 12;

  if (noteNumber < 0 || noteNumber > 127) return;
  if (activeNotes.includes(noteNumber)) return;

  const volume = (1 / 127) * data.velocity;
  activeNotes = [noteNumber, ...activeNotes];

  SYNTH.triggerAttack(
    Tone.Frequency(noteNumber, "midi").toNote(),
    Tone.now(),
    volume
  );
}

function onNoteOff(topic: string, data: NoteOff) {
  const noteNumber = data.noteNumber + octave * 12;
  if (noteNumber < 0 || noteNumber > 127) return;
  if (!activeNotes.includes(noteNumber)) return;

  activeNotes = activeNotes.filter((note) => note !== noteNumber);

  SYNTH.triggerRelease(Tone.Frequency(noteNumber, "midi").toNote());
}

function onFocusChange(topic: string, data: string) {
  focus = data;
}

function onControlChange(topic: string, data: ControlChange) {
  if (focus === "filter") return updateFilter(data);
  if (focus === "filterEnvelope") return updateFilterEnvelope(data);
  if (focus === "ampEnvelope") return updateAmpEnvelope(data);
}

function updateFilter(data: ControlChange) {
  const { controlChangeNumber: cc, value } = data;

  if (cc === 70) return updateFilterFrequency(value);
  if (cc === 71) return updateFilterResonance(value);
}

function updateFilterFrequency(value: number) {
  SYNTH.set({
    filterEnvelope: {
      baseFrequency: scaler.controlChangeToFilterFrequency(value),
    },
  });
}

function updateFilterResonance(value: number) {
  SYNTH.set({
    filter: {
      Q: scaler.controlChangeToFilterResonance(value),
    },
  });
}

function updateFilterEnvelope(data: ControlChange) {
  const { controlChangeNumber: cc, value } = data;

  if (cc === 70) return updateFilterEnvelopeParam("attack", value);
  if (cc === 71) return updateFilterEnvelopeParam("decay", value);
  if (cc === 72) return updateFilterEnvelopeParam("sustain", value);
  if (cc === 73) return updateFilterEnvelopeParam("release", value);
  if (cc === 74) return updateFilterEnvelopeParam("amount", value);
}

function updateFilterEnvelopeParam(param: string, value: number) {
  const scalerMap: ScalerMap = {
    attack: scaler.controlChangeToFilterEnvelopeAttack,
    decay: scaler.controlChangeToFilterEnvelopeDecay,
    sustain: scaler.controlChangeToFilterEnvelopeSustain,
    release: scaler.controlChangeToAmpEnvelopeRelease,
    amount: scaler.controlChangeToFilterEnvelopeAmount,
  };

  SYNTH.set({
    filterEnvelope: {
      [param]: scalerMap[param](value),
    },
  });
}

function updateAmpEnvelope(data: ControlChange) {
  const { controlChangeNumber: cc, value } = data;

  if (cc === 70) return updateAmpEnvelopeParam("attack", value);
  if (cc === 71) return updateAmpEnvelopeParam("decay", value);
  if (cc === 72) return updateAmpEnvelopeParam("sustain", value);
  if (cc === 73) return updateAmpEnvelopeParam("release", value);
}

function updateAmpEnvelopeParam(param: string, value: number) {
  const scalerMap: ScalerMap = {
    attack: scaler.controlChangeToAmpEnvelopeAttack,
    decay: scaler.controlChangeToAmpEnvelopeDecay,
    sustain: scaler.controlChangeToAmpEnvelopeSustain,
    release: scaler.controlChangeToAmpEnvelopeRelease,
  };

  SYNTH.set({
    envelope: {
      [param]: scalerMap[param](value),
    },
  });
}

function onOctaveChange(topic: string, data: number) {
  if (data < minOctave || data > maxOctave) return;
  SYNTH.releaseAll()
  octave = data;
}

function onPitchBend(topic: string, data: number) {
  const pitchBend = data;

  const detune = scaler.pitchBendToDetune(data, 1200);

  SYNTH.set({
    detune: detune,
  });
}

export { octave, minOctave, maxOctave };
