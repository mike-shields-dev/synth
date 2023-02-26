const synthConfig = {
    oscillator: {
      type: "sawtooth",
      volume: 1,
      phase: 0,
      mute: false,
      onstop: () => null,
    },
    filter: {
      type: 'lowpass',
      detune: 0,
      frequency: 0,
      gain: 1,
      Q: 6,
      rolloff: -12,
    },
    envelope: {
      attack: 0.0001,
      attackCurve: "linear",
      decay: 0.5,
      decayCurve: "linear",
      sustain: 1,
      release: 1,
      releaseCurve: "linear",
    },
    detune: 0,
    filterEnvelope: {
      attack: 0.5,
      attackCurve: "linear",
      baseFrequency: 2000,
      decay: 0.5,
      decayCurve: 'linear',
      exponent: 1,
      octaves: 2,
      sustain: 1,
      release: 1,
      releaseCurve: 'linear',
    },
    onsilence: () => null,
    portamento: 0,
    volume: 0,
}
  
export { synthConfig };