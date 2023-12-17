function formatNumber(num: number) {
  if (num >= 0 && num < 10) {
    return num.toFixed(4)
  } else if (num >= 10 && num < 100) {
    return num.toFixed(3);
  } else if (num >= 100 && num < 1000) {
    return num.toFixed(2);
  } else if (num >= 1000 && num < 10000) {
    return num.toFixed(1);
  } else if (num >= 10000) {
    return Math.round(num).toFixed(0);
  }
}

export { formatNumber };
