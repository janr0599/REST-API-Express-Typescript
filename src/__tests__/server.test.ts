describe("Our first test", () => {
    test("Must check 1 + 1 equals 2", () => {
        expect(1 + 1).toBe(2);
    });

    test("Must check 1 + 1 is not equal to 3", () => {
        expect(1 + 1).not.toBe(3);
    });
});
