function dyOVERdx(x, y) {
  return (x * y - Math.pow(x, 2));
}
function eulerMagic(x0, y0, step, target) {
  var y1 = y0;
  for (i = 0; i <= ((target - x0) / step); i++) {
    console.log("[ step = " + i + " | x = " + (x0 + (i * step)) + " | y = " + y1 + " | dy/dx = " + dyOVERdx(x0 + (i * step), y1) + " | delta y = " + (step * dyOVERdx(x0 + (i * step), y1)) + " ]");
    y1 = y1 + step * dyOVERdx(x0 + (i * step), y1);
  }
  return y1;
}