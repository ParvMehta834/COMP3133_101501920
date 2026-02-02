const { expect } = require("chai");
const calc = require("../calculator");

describe("Calculator Tests (PASS + FAIL for each operation)", function () {

  
  it("ADD PASS: add(5,2) should equal 7", function () {
    const actual = calc.add(5, 2);
    console.log("✅ ADD PASS: add(5,2) expected 7, got", actual);
    expect(actual).to.equal(7);
  });

  it("ADD FAIL: add(5,2) should equal 8 (intentional fail)", function () {
    const actual = calc.add(5, 2);
    console.log("❌ ADD FAIL (expected): add(5,2) expected 8, got", actual);
    expect(actual).to.equal(8); // intentional fail
  });

  // SUB
  it("SUB PASS: sub(5,2) should equal 3", function () {
    const actual = calc.sub(5, 2);
    console.log("✅ SUB PASS: sub(5,2) expected 3, got", actual);
    expect(actual).to.equal(3);
  });

  it("SUB FAIL: sub(5,2) should equal 5 (intentional fail)", function () {
    const actual = calc.sub(5, 2);
    console.log("❌ SUB FAIL (expected): sub(5,2) expected 5, got", actual);
    expect(actual).to.equal(5); // intentional fail
  });

  // MUL
  it("MUL PASS: mul(5,2) should equal 10", function () {
    const actual = calc.mul(5, 2);
    console.log("✅ MUL PASS: mul(5,2) expected 10, got", actual);
    expect(actual).to.equal(10);
  });

  it("MUL FAIL: mul(5,2) should equal 12 (intentional fail)", function () {
    const actual = calc.mul(5, 2);
    console.log("❌ MUL FAIL (expected): mul(5,2) expected 12, got", actual);
    expect(actual).to.equal(12); // intentional fail
  });

  // DIV
  it("DIV PASS: div(10,2) should equal 5", function () {
    const actual = calc.div(10, 2);
    console.log("✅ DIV PASS: div(10,2) expected 5, got", actual);
    expect(actual).to.equal(5);
  });

  it("DIV FAIL: div(10,2) should equal 2 (intentional fail)", function () {
    const actual = calc.div(10, 2);
    console.log("❌ DIV FAIL (expected): div(10,2) expected 2, got", actual);
    expect(actual).to.equal(2); // intentional fail
  });

});
