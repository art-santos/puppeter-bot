// Assuming trimPhone is exported from a module, import it
const { trimPhone } = require("./trimPhone");

describe("trimPhone", () => {
  it("should remove domain part from the phone number", () => {
    const input = "5511997658395@c.us";
    const expectedOutput = "5511997658395";
    console.log(trimPhone(input));
    expect(trimPhone(input)).toBe(expectedOutput);
  });

  it("should return the same string if no domain part present", () => {
    const input = "5511997658395";
    const expectedOutput = "5511997658395";
    expect(trimPhone(input)).toBe(expectedOutput);
  });

  it("should handle empty strings", () => {
    const input = "";
    const expectedOutput = "";
    expect(trimPhone(input)).toBe(expectedOutput);
  });

  // Add more test cases as necessary...
});
