// should be able to sort anything, not just numbers
/**
 * @param {(array: any)=>number} arrayLenFn
 * @param {(array: any, idx: number)=>any} getFn
 * @param {(array: any, idx: number, value: any)=>void} setFn
 * @param {(array: any, startIdx: number,endIdxPlusOne:number)=>any} sliceFn
 * @param {(a: any, b:any)=>boolean} isLesserThanFn
 * @param {(a: any, b:any)=>boolean} isLesserThanOrEqualToFn
 */
export function configQuickMergeSort(
  arrayLenFn,
  getFn,
  setFn,
  sliceFn,
  isLesserThanFn,
  isLesserThanOrEqualToFn
) {
  arrayLen = arrayLenFn;
  get = getFn;
  set = setFn;
  slice = sliceFn;
  isLesserThan = isLesserThanFn;
  isLesserThanOrEqualTo = isLesserThanOrEqualToFn;
}

/**
 * @type {(array:any)=>number}
 */
let arrayLen;

/**
 * @type {(array: any, idx: number)=>any}
 */
let get;

/**
 * @type {(array: any, idx: number,value:any)=>void}
 */
let set;

/**
 * @type {(array: any, startIdx: number,endIdxPlusOne:number)=>any}
 */
let slice;

/**
 * @type {(a: any, b:any)=>boolean}
 */
let isLesserThan;

/**
 * @type {(a: any, b:any)=>boolean}
 */
let isLesserThanOrEqualTo;

/**
 * @param {any} array_
 */
export function quickMergeSort(array_) {
  array = array_;
  if (arrayLen(array) <= 1) {
    return;
  }
  stack.length = 0;
  //assert(!isNaN(arrayLen(array) - 1));
  stack.push([0, arrayLen(array) - 1]);
  quickMergeSortArrayPart();
}

function quickMergeSortArrayPart() {
  while (stack.length > 0) {
    quickMergeSortArrayPartSingleIteration();
  }
}

function quickMergeSortArrayPartSingleIteration() {
  stackElement = stack.pop();

  for (const num of stackElement) {
    //assert(!isNaN(num));
  }

  if (stackElement.length === 3) {
    //3 elements = array merge task
    mergeArrays();
    return;
  }
  quickMergeSortSingleNonMergeIteration();
}

function quickMergeSortSingleNonMergeIteration() {
  [lowerIdx, upperIdx] = stackElement;
  //assert(!isNaN(upperIdx));
  //assert(upperIdx > lowerIdx);
  if (upperIdx === lowerIdx + 1) {
    if (isLesserThan(get(array, upperIdx), get(array, lowerIdx))) {
      tmp = get(array, upperIdx);
      set(array, upperIdx, get(array, lowerIdx));
      set(array, lowerIdx, tmp);
    }
    return;
  }

  midIdx = Math.floor((lowerIdx + upperIdx) / 2);
  //assert(!isNaN(midIdx));

  // last task first: merge arrays.
  // Lower array includes midIdx
  //assert(!isNaN(lowerIdx));
  //assert(!isNaN(midIdx));
  //assert(!isNaN(upperIdx));
  stack.push([lowerIdx, midIdx, upperIdx]);
  const numOfElementsOfUpperArray = upperIdx - midIdx;
  if (numOfElementsOfUpperArray > 1) {
    //assert(!isNaN(midIdx + 1));
    //assert(!isNaN(upperIdx));
    stack.push([midIdx + 1, upperIdx]);
  }
  const numOfElementsOfLowerArray = midIdx - lowerIdx + 1;
  if (numOfElementsOfLowerArray > 1) {
    //assert(!isNaN(lowerIdx));
    //assert(!isNaN(midIdx));
    stack.push([lowerIdx, midIdx]);
  }
}

function mergeArrays() {
  [lowerIdx, midIdx, upperIdx] = stackElement;
  if (isLesserThanOrEqualTo(get(array, midIdx), get(array, midIdx + 1))) {
    //everything already in order!!!
    return;
  }
  mergeArraysUnconditionally();
}

function mergeArraysUnconditionally() {
  arraysToMergeCopy = slice(array, lowerIdx, upperIdx + 1);
  lowerArrayIdx = 0;
  upperArrayIdxStart = midIdx - lowerIdx + 1;
  upperArrayIdx = upperArrayIdxStart;
  for (writeIdx = lowerIdx; writeIdx <= upperIdx; writeIdx++) {
    writeMergedElement();
  }
}

function writeMergedElement() {
  lowerEle =
    lowerArrayIdx == null ? null : get(arraysToMergeCopy, lowerArrayIdx);
  upperEle =
    upperArrayIdx == null ? null : get(arraysToMergeCopy, upperArrayIdx);
  //assert(upperEle != null || lowerEle != null);
  if (
    lowerEle != null &&
    (upperEle == null || isLesserThan(lowerEle, upperEle))
  ) {
    set(array, writeIdx, lowerEle);
    // @ts-ignore
    lowerArrayIdx++;
    // @ts-ignore
    if (lowerArrayIdx >= upperArrayIdxStart) {
      lowerArrayIdx = null;
    }
    return;
  }
  // @ts-ignore
  set(array, writeIdx, upperEle);
  // @ts-ignore
  upperArrayIdx++;
  // @ts-ignore
  if (upperArrayIdx >= arrayLen(arraysToMergeCopy)) {
    upperArrayIdx = null;
  }
}

/**
 * @type numberOrNull
 */
let lowerArrayIdx;

/**
 * @type numberOrNull
 */
let upperArrayIdx;

/**
 * @type any
 */
let arraysToMergeCopy;

/**
 * @type number
 */
let writeIdx;

/**
 * @type numberOrNull
 */
let lowerEle;

/**
 * @type numberOrNull
 */
let upperEle;

/**
 * @type number
 */
let upperArrayIdxStart;

/**
 * @param {boolean} x
 */
function assert(x) {
  if (!x) {
    debugger;
    throw new Error("assert failed");
  }
}

/**
 *  @typedef {(number|null)} numberOrNull
 */

/**
 * @type {any}
 */
let array;

const stack = [];

/**
 * @type {number[]}
 */
let stackElement;

/**
 * @type number
 */
let lowerIdx;

/**
 * @type number
 */
let upperIdx;

/**
 * @type number
 */
let tmp;

/**
 * @type number
 */
let midIdx;
