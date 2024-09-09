import { firstAvailableCell } from "../components/GridArea";
import { ROWS } from "../constants";
import { COLUMNS } from "../constants";
import { OccupiedSpots } from "../types";

test("Empty occupiedSpots and x as 0", () => {
  const occupiedSpots = {};
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

test("Empty occupiedSpots and x smaller then minimum possible value", () => {
  const occupiedSpots = {};
  const xValue = -1;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

test("Empty occupiedSpots and x greater then maximum possible value", () => {
  const occupiedSpots = {};
  const xValue = COLUMNS + 1;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

test("Not empty occupiedSpots {x: 0, y: 0} and x as 0", () => {
  const occupiedSpots = { x: "0", y: "0" };
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toBe(null);
});

test("Not empty occupiedSpots {x: 1, y: 1} and x as 0", () => {
  const occupiedSpots = { x: "1", y: "1" };
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: 0,
  });
});

test("occupiedSpots with typical strings as values", () => {
  const occupiedSpots = { x: "a", y: "b" };
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: NaN,
  });
});

test("occupiedSpots with null as values", () => {
  const occupiedSpots = { x: null, y: null };
  const xValue = 0;
  expect(
    firstAvailableCell(occupiedSpots as unknown as OccupiedSpots, xValue)
  ).toEqual({
    x: xValue,
    y: -1,
  });
});

test("occupiedSpots with undefined as values", () => {
  const occupiedSpots = { x: undefined, y: undefined };
  const xValue = 0;
  expect(
    firstAvailableCell(occupiedSpots as unknown as OccupiedSpots, xValue)
  ).toEqual({
    x: xValue,
    y: -1,
  });
});
