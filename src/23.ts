type Item = {
  label: number;
  next?: Item;
};

const data = [6, 2, 4, 3, 9, 7, 1, 5, 8];
const max = Math.max(...data);

function toLinkedList(data: number[], until = max): Item {
  const first: Item = { label: data[0] };
  let last = data.slice(1).reduce((prev, label) => {
    return prev.next = { label };
  }, first);

  for (let i = max + 1; i <= until; i++) {
    last.next = { label: i };
    last = last.next;
  }

  last.next = first;
  return first;
}

function toArray(item: Item) {
  const arr = [item.label];
  let next = item.next;
  while (next && next !== item) {
    arr.push(next.label);
    next = next.next;
  }
  return arr;
}

function destLabel(current: number, exclude: Item, maxLabel: number) {
  let label = current;
  outer:
  while (true) {
    label = label === 1 ? maxLabel : label - 1;
    let next = exclude as Item | undefined;
    while (next) {
      if (next.label === label) {
        continue outer;
      }
      next = next.next;
    }
    return label;
  }
}

function removeThree(item: Item) {
  const next = item.next!;
  const third = next.next!.next!;
  item.next = third.next;
  delete third.next;
  return next;
}

function addThree(item: Item, three: Item) {
  const next = item.next!;
  const third = three.next!.next!;
  item.next = three;
  third.next = next;
}

function play(list: Item, moves: number, maxLabel = max) {
  let current = list;

  const itemCache = new Map<number, Item>();

  while (moves > 0) {
    const removed = removeThree(current);
    const dest = destLabel(current.label, removed, maxLabel);
    let destItem = itemCache.get(dest) ?? current.next!;
    while (destItem.label !== dest) {
      itemCache.set(destItem.label, destItem);
      destItem = destItem.next!;
    }
    addThree(destItem, removed);
    current = current.next!;
    moves--;
  }
  while (current.label !== 1) {
    current = itemCache.get(1) ?? current.next!;
  }
  return current;
}

function playGame1(data: number[]) {
  const result = play(toLinkedList(data), 100);
  return toArray(result).slice(1).join("");
}

function playGame2(data: number[]) {
  const list = toLinkedList(data, 1000000);
  const result = play(list, 10000000, 1000000);
  const cup1 = result.next!.label;
  const cup2 = result.next!.next!.label;
  return cup1 * cup2;
}

const result1 = playGame1(data);
const result2 = playGame2(data);

console.log(`RESULT FOR PUZZLE1 ${result1}`);
console.log(`RESULT FOR PUZZLE2 ${result2}`);

export {};
