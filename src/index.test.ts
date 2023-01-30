import { renderHook, act } from "@testing-library/react-hooks";
import useListSelectionManagement from "./";
const data = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
];
describe("hook should work", () => {
  const { result } = renderHook(() =>
    useListSelectionManagement(data, (i) => i.id)
  );

  test("hook should work", () => {
    expect(result.current.totalItemsCount).toBe(4);
    act(() => {
      result.current.toggleThisItem("1", true);
    });

    expect(result.current.selectedItemsCount).toBe(1);
    act(() => {
      result.current.toggleAllItems(true);
    });

    expect(result.current.selectedItemsCount).toBe(4);
  });
});
