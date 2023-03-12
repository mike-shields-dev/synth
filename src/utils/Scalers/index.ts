import { scaleLinear, scalePow } from "d3-scale";

const C_CHANGE = [0, 127];

const FREQUENCY = [20, 20_000]
const RESONANCE = [0, 24];
const FILTER_ENV_OCTAVES = [0, 10];

const ATTACK = [0.0001, 10];
const DECAY = [0.0001, 10];
const SUSTAIN = [0.0001, 1];
const RELEASE = [0.0001, 10];

const octaveToNoteOffset = (octave: number) => octave * 12; 

// Pitch

const pitchBendToDetune = (pitchBend: number, detune: number) => (pitchBend - 8192) / 8192 * detune;

// Filter

const controlChangeToFilterFrequency =
    scalePow().exponent(4).domain(C_CHANGE).range(FREQUENCY);

const filterFrequencyToControlChange =
    controlChangeToFilterFrequency.invert;

const controlChangeToFilterResonance =
    scalePow().exponent(1).domain(C_CHANGE).range(RESONANCE);

const filterResonanceToControlChange =
    controlChangeToFilterResonance.invert;

const controlChangeToFilterEnvelopeAttack =
    scalePow().exponent(1).domain(C_CHANGE).range(ATTACK);

const filterEnvelopeAttackToControlChange =
    controlChangeToFilterEnvelopeAttack.invert;

const controlChangeToFilterEnvelopeDecay =
    scalePow().exponent(1).domain(C_CHANGE).range(DECAY);

const filterEnvelopeDecayToControlChange =
    controlChangeToFilterEnvelopeDecay.invert;

const controlChangeToFilterEnvelopeSustain =
    scaleLinear().domain(C_CHANGE).range(SUSTAIN);

const filterEnvelopeSustainToControlChange =
    controlChangeToFilterEnvelopeSustain.invert;

const controlChangeToFilterEnvelopeRelease =
    scalePow().exponent(1).domain(C_CHANGE).range(RELEASE);

const filterEnvelopeReleaseToControlChange =
    controlChangeToFilterEnvelopeRelease.invert;

const controlChangeToFilterEnvelopeAmount =
    scaleLinear().domain(C_CHANGE).range(FILTER_ENV_OCTAVES);

const filterEnvelopeAmountToControlChange =
    controlChangeToFilterEnvelopeAmount.invert;

// Amp Envelope

const controlChangeToAmpEnvelopeAttack =
    scalePow().exponent(2).domain(C_CHANGE).range(ATTACK);

const envelopeAttackToControlChange =
    controlChangeToAmpEnvelopeAttack.invert;

const controlChangeToAmpEnvelopeDecay =
    scaleLinear().domain(C_CHANGE).range(DECAY);

const envelopeDecayToControlChange = controlChangeToAmpEnvelopeDecay.invert;

const controlChangeToAmpEnvelopeSustain =
    scaleLinear().domain(C_CHANGE).range(SUSTAIN);

const envelopeSustainToControlChange =
    controlChangeToAmpEnvelopeSustain.invert;

const controlChangeToAmpEnvelopeRelease =
    scaleLinear().domain(C_CHANGE).range(RELEASE);

const envelopeReleaseToControlChange =
    controlChangeToAmpEnvelopeRelease.invert;

export {
    pitchBendToDetune,
    octaveToNoteOffset,
    controlChangeToFilterFrequency,
    filterFrequencyToControlChange,
    controlChangeToFilterResonance,
    filterResonanceToControlChange,
    controlChangeToFilterEnvelopeAttack,
    filterEnvelopeAttackToControlChange,
    controlChangeToFilterEnvelopeDecay,
    filterEnvelopeDecayToControlChange,
    controlChangeToFilterEnvelopeRelease,
    filterEnvelopeReleaseToControlChange,
    controlChangeToFilterEnvelopeSustain,
    filterEnvelopeSustainToControlChange,
    controlChangeToFilterEnvelopeAmount,
    filterEnvelopeAmountToControlChange,
    controlChangeToAmpEnvelopeAttack,
    envelopeAttackToControlChange,
    controlChangeToAmpEnvelopeDecay,
    envelopeDecayToControlChange,
    controlChangeToAmpEnvelopeSustain,
    envelopeSustainToControlChange,
    controlChangeToAmpEnvelopeRelease,
    envelopeReleaseToControlChange,
};
