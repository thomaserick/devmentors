import { sum as sum2, sum6 } from "./sum.js";
//import { sub, sub6 } from "./sub.js";
import * as sub from "./sub.js";

class Calculator {
  sum2(a, b) {
    return sum2(a, b);
  }

  sub(a, b) {
    return sub(a, b);
  }

  subEcma6(a, b) {
    return sub.sub6(a, b);
  }

  sumEcma6(a, b) {
    return sub.sum6(a, b);
  }
}

export default Calculator;
