import { coordinatesToSpotId } from "../components/GridArea";
import { Coordinates } from "../types";

test("Two positive values as coordinates", () => {
  const coordinates = { x: 1, y: 2 };
  expect(coordinatesToSpotId(coordinates)).toBe("1,2");
});

test("One positive (x) and one negative (y) value as coordinates", () => {
  const coordinates = { x: 1, y: -2 };
  expect(coordinatesToSpotId(coordinates)).toBe("1,-2");
});

test("One positive (y) and one negative (x) value as coordinates", () => {
  const coordinates = { x: -1, y: 2 };
  expect(coordinatesToSpotId(coordinates)).toBe("-1,2");
});

test("Two negative values as coordinates", () => {
  const coordinates = { x: -1, y: -2 };
  expect(coordinatesToSpotId(coordinates)).toBe("-1,-2");
});

test("String values as coordinates", () => {
  const coordinates = { x: "a", y: "b" };
  expect(coordinatesToSpotId(coordinates as unknown as Coordinates)).toBe(
    "a,b"
  );
});

test("Null values as coordinates", () => {
  const coordinates = { x: null, y: null };
  expect(coordinatesToSpotId(coordinates as unknown as Coordinates)).toBe(
    "null,null"
  );
});

test("Undefined values as coordinates", () => {
  const coordinates = { x: undefined, y: undefined };
  expect(coordinatesToSpotId(coordinates as unknown as Coordinates)).toBe(
    "undefined,undefined"
  );
});
