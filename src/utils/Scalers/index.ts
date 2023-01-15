import { scalePow, scaleLinear } from "d3-scale";

const controlChangeToFilterFrequency =
    scalePow().exponent(4).domain([0, 127]).range([20, 20000]);

const filterFrequencyToControlChange =
    controlChangeToFilterFrequency.invert;


const controlChangeToFilterQ =
    scalePow().exponent(1).domain([0, 127]).range([0, 24]);

const filterQToControlChange =
    controlChangeToFilterQ.invert;


const controlChangeToEnvelopeAttack =
    scalePow().exponent(2).domain([0, 127]).range([0, 2]);

const envelopeAttackToControlChange =
    controlChangeToEnvelopeAttack.invert;


const controlChangeToEnvelopeDecay =
    scaleLinear().domain([0, 127]).range([0, 2]);

const envelopeDecayToControlChange = controlChangeToEnvelopeDecay.invert;


const controlChangeToEnvelopeSustain =
    scaleLinear().domain([0, 127]).range([0, 1]);

const envelopeSustainToControlChange =
    controlChangeToEnvelopeSustain.invert;


const controlChangeToEnvelopeRelease =
    scaleLinear().domain([0, 127]).range([0.0001, 5]);

const envelopeReleaseToControlChange =
    controlChangeToEnvelopeRelease.invert;


const controlChangeToEnvelopeAmount =
    scaleLinear().domain([0, 127]).range([0, 10]);

const envelopeAmountToControlChange = controlChangeToEnvelopeAmount.invert;


export {
    controlChangeToFilterFrequency,
    filterFrequencyToControlChange,
    controlChangeToFilterQ,
    filterQToControlChange,
    controlChangeToEnvelopeAttack,
    envelopeAttackToControlChange,
    controlChangeToEnvelopeDecay,
    envelopeDecayToControlChange,
    controlChangeToEnvelopeSustain,
    envelopeSustainToControlChange,
    controlChangeToEnvelopeRelease,
    envelopeReleaseToControlChange,
    controlChangeToEnvelopeAmount,
    envelopeAmountToControlChange,
}