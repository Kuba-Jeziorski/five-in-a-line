import {
  // createOccupiedSpots,
  firstAvailableCell,
} from "../components/GridArea";
import { ROWS } from "../constants";
import { COLUMNS } from "../constants";
import { OccupiedSpots } from "../types";

test("Empty occupiedSpots and x as 0", () => {
  const occupiedSpots = new Map();
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

test("Empty occupiedSpots and x smaller then minimum possible value", () => {
  const occupiedSpots = new Map();
  const xValue = -1;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

test("Empty occupiedSpots and x greater then maximum possible value", () => {
  const occupiedSpots = new Map();
  const xValue = COLUMNS + 1;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: ROWS - 1,
  });
});

//TO DO
// test.todo
test.skip("Not empty occupiedSpots {x: 1, y: 1} and x as 0", () => {
  const occupiedSpots: OccupiedSpots = new Map();
  occupiedSpots.set(`0,7`, "1");
  const xValue = 0;
  expect(firstAvailableCell(occupiedSpots, xValue)).toEqual({
    x: xValue,
    y: 6,
  });
});
