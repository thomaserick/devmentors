import { sum as sum2 } from "./sum.js";
import { sub } from "./sub.js";

class Calculator {
  sum(a, b) {
    return sum(a, b);
  }
  sub(a, b) {
    return sub(a, b);
  }
}

export default Calculator;
