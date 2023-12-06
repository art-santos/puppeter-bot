import { getDifferences } from "./getDifferences";

describe("getDifferences", () => {
  it("should correctly identify differences between two objects", () => {
    const originalObject = {
      name: "John",
      age: 30,
      contact: {
        email: "john@example.com",
        phone: "1234567890",
      },
    };

    const updatedObject = {
      name: "John",
      age: 31,
      contact: {
        email: "john.doe@example.com",
        phone: "1234567890",
      },
    };

    const expectedDifferences = {
      age: { before: 30, after: 31 },
      "contact.email": {
        before: "john@example.com",
        after: "john.doe@example.com",
      },
    };

    const differences = getDifferences(originalObject, updatedObject);

    expect(differences).toEqual(expectedDifferences);
  });

  it('should return "no changes" if there are no differences', () => {
    const originalObject = { name: "Alice", age: 25 };
    const updatedObject = { ...originalObject };

    const result = getDifferences(originalObject, updatedObject);

    expect(result).toBe("no changes");
  });
});
