import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * 
 * @param list the list of items to manage
 * @param getItemId the function to get the item id, the id will be used as the discriminator
 * @param initiallySelected  determines whether all items are selected initially
 * @param initialSelectionMap determines inital selection status of the list, will override {@link initiallySelected}
 */
export default function useListSelectionManagement<T>(
  list: T[] | undefined | null,
  getItemId: (i: T) => string,
  initiallySelected: boolean = false,
  initialSelectionMap: Record<string, boolean> = {}
) {
  const [listSelectionMap, setListSelectionMap] = useState<
    Record<string, boolean>
  >(() => {
    if (!list?.length) return {};
    return list.reduce((p, c) => {
      const itemId = getItemId(c);
      const selected =
        initialSelectionMap[itemId] ?? initiallySelected ?? false;

      return { ...p, [itemId]: selected };
    }, {});
  });

  useEffect(() => {
    if (!list?.length) {
      setListSelectionMap({});
      return;
    }
    const newMap = list.reduce((p, c) => {
      const itemId = getItemId(c);
      const selected =
        listSelectionMap[itemId] ??
        initialSelectionMap[itemId] ??
        initiallySelected ??
        false;

      return { ...p, [itemId]: selected };
    }, {});

    setListSelectionMap(newMap);
  }, [list]);

  const totalItemsCount = useMemo(() => list?.length, [list]);

  const selectedItems = useMemo(
    () =>
      list?.filter((i) => {
        const itemId = getItemId(i);
        return !!listSelectionMap[itemId];
      }),
    [list, listSelectionMap, getItemId]
  );

  const selectedItemsCount = useMemo(
    () => selectedItems?.length,
    [selectedItems]
  );

  const isAllSelected = useMemo(() => {
    if (!totalItemsCount) {
      return false;
    }
    return selectedItemsCount === totalItemsCount;
  }, [totalItemsCount, selectedItemsCount]);

  const isSomeButNotAllSelected = useMemo(() => {
    if (!totalItemsCount || !selectedItemsCount) {
      return false;
    }
    return selectedItemsCount < totalItemsCount;
  }, [totalItemsCount, selectedItemsCount]);

  const toggleThisItem = useCallback((itemId: string, selected: boolean) => {
    setListSelectionMap((p) => ({ ...p, [itemId]: selected }));
  }, []);

  const toggleAllItems = useCallback((selected: boolean) => {
    setListSelectionMap((p) =>
      Object.fromEntries(Object.keys(p).map((k) => [k, selected]))
    );
  }, []);

  return {
    totalItemsCount,
    selectedItems,
    selectedItemsCount,
    isAllSelected,
    isSomeButNotAllSelected,
    toggleThisItem,
    toggleAllItems,
    listSelectionMap,
  };
}
