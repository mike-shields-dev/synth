import { formatNumber } from '.';
import { expect } from 'vitest';

describe("formatNumber", () => {
    it("should format numbers in the range 0 - 9 with 4 decimal places", () => {
      expect(formatNumber(0.123456)).toEqual("0.1235");
      expect(formatNumber(1.234567)).toEqual("1.2346");
      expect(formatNumber(9.999999)).toEqual("10.0000");
    });
  
    it("should format numbers in the range 10 - 99 with 3 decimal places", () => {
      expect(formatNumber(10.12345)).toEqual("10.123");
      expect(formatNumber(50.67890)).toEqual("50.679");
      expect(formatNumber(99.99999)).toEqual("100.000");
    });
  
    it("should format numbers in the range 100 - 999 with 2 decimal places", () => {
      expect(formatNumber(100.12345)).toEqual("100.12");
      expect(formatNumber(500.67890)).toEqual("500.68");
      expect(formatNumber(999.99999)).toEqual("1000.00");
    });
  
    it("should format numbers in the range 1000 - 9999 with 1 decimal place", () => {
      expect(formatNumber(1000.12345)).toEqual("1000.1");
      expect(formatNumber(5000.67890)).toEqual("5000.7");
      expect(formatNumber(9999.99999)).toEqual("10000.0");
    });
  
    it("should format numbers in the range 10000 - 20000 with no decimal places", () => {
      expect(formatNumber(10000.12345)).toEqual("10000");
      expect(formatNumber(15000.67890)).toEqual("15001");
      expect(formatNumber(20000)).toEqual("20000");
    });
  });