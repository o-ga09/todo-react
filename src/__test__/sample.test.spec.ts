describe("sample test", () => {
    test("Test add function", () => {
        expect(add(1,1)).toBe(2);
    });
});

function add(arg0: number, arg1: number): number {
    return arg0 + arg1
}
