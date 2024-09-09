import { range } from "../components/GridArea";

test("Array length is 0 while argument is 0 (number)", () => {
  expect(range(0)).toEqual([]);
});

test("Array length is 1 while argument is 1 (number)", () => {
  expect(range(1)).toEqual([0]);
});

test("Array length is 2 while argument is 2 (number)", () => {
  expect(range(2)).toEqual([0, 1]);
});

test("Array length is 0 while argument is -1 (number)", () => {
  expect(range(-1)).toEqual([]);
});

test("Array length is 0 while argument is string", () => {
  expect(range("0" as unknown as number)).toEqual([]);
});

test("Array length is 0 while argument is null", () => {
  expect(range(null as unknown as number)).toEqual([]);
});

test("Array length is 0 while argument is undefined", () => {
  expect(range(undefined as unknown as number)).toEqual([]);
});
