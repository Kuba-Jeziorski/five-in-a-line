import {
  coordinatesToSpotId,
  spotIdToCoordinates,
} from "../components/GridArea";

test("String of two positive number values", () => {
  const spotId = coordinatesToSpotId({ x: 1, y: 2 });
  expect(spotIdToCoordinates(spotId)).toEqual({ x: 1, y: 2 });
});

test("String of two negative number values", () => {
  const spotId = "-1,-2";
  expect(spotIdToCoordinates(spotId)).toEqual({ x: -1, y: -2 });
});
