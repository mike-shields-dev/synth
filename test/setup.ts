import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';
import WMT from 'web-midi-test';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeEach(() => {
  global.navigator.requestMIDIAccess = WMT.requestMIDIAccess; 
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});