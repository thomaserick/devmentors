import Calculator from "./calculator.js";

const calc = new Calculator();

console.log("Valor da Soma: " + calc.sum2(2, 4));
console.log("Valor da Subtração: " + calc.sub(10, 5));

console.log("Valor da Subtração Ecma6: " + calc.subEcma6(8, 5));
console.log("Valor da Soma Ecma6: " + calc.sumEcma6(2, 4));
