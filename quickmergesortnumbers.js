/**
 * @param {number[]} array_
 */
export function quickMergeSort(array_) {
  array = array_;
  if (array.length <= 1) {
    return;
  }
  stack.length = 0;
  stack.push([0, array.length - 1]);
  quickMergeSortArrayPart();
}

function quickMergeSortArrayPart() {
  while (stack.length > 0) {
    quickMergeSortArrayPartSingleIteration();
  }
}

function quickMergeSortArrayPartSingleIteration() {
  stackElement = stack.pop();
  if (stackElement.length === 3) {
    //3 elements = array merge task
    mergeArrays();
    return;
  }
  quickMergeSortSingleNonMergeIteration();
}

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

function quickMergeSortSingleNonMergeIteration() {
  [lowerIdx, upperIdx] = stackElement;
  assert(upperIdx > lowerIdx);
  if (upperIdx === lowerIdx + 1) {
    if (array[upperIdx] < array[lowerIdx]) {
      tmp = array[upperIdx];
      array[upperIdx] = array[lowerIdx];
      array[lowerIdx] = tmp;
    }
    return;
  }

  midIdx = Math.floor((lowerIdx + upperIdx) / 2);

  // last task first: merge arrays.
  // Lower array includes midIdx
  stack.push([lowerIdx, midIdx, upperIdx]);
  const numOfElementsOfUpperArray = upperIdx - midIdx;
  if (numOfElementsOfUpperArray > 1) {
    stack.push([midIdx + 1, upperIdx]);
  }
  const numOfElementsOfLowerArray = midIdx - lowerIdx + 1;
  if (numOfElementsOfLowerArray > 1) {
    stack.push([lowerIdx, midIdx]);
  }
}

function mergeArrays() {
  [lowerIdx, midIdx, upperIdx] = stackElement;
  if (array[midIdx] <= array[midIdx + 1]) {
    //everything already in order!!!
    return;
  }
  mergeArraysUnconditionally();
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
 * @type number[]
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

function mergeArraysUnconditionally() {
  arraysToMergeCopy = array.slice(lowerIdx, upperIdx + 1);
  lowerArrayIdx = 0;
  upperArrayIdxStart = midIdx - lowerIdx + 1;
  upperArrayIdx = upperArrayIdxStart;
  for (writeIdx = lowerIdx; writeIdx <= upperIdx; writeIdx++) {
    writeMergedElement();
  }
}

function writeMergedElement() {
  lowerEle = lowerArrayIdx == null ? null : arraysToMergeCopy[lowerArrayIdx];
  upperEle = upperArrayIdx == null ? null : arraysToMergeCopy[upperArrayIdx];
  assert(upperEle != null || lowerEle != null);
  if (lowerEle != null && (upperEle == null || lowerEle < upperEle)) {
    array[writeIdx] = lowerEle;
    // @ts-ignore
    lowerArrayIdx++;
    // @ts-ignore
    if (lowerArrayIdx >= upperArrayIdxStart) {
      lowerArrayIdx = null;
    }
    return;
  }
  // @ts-ignore
  array[writeIdx] = upperEle;
  // @ts-ignore
  upperArrayIdx++;
  // @ts-ignore
  if (upperArrayIdx >= arraysToMergeCopy.length) {
    upperArrayIdx = null;
  }
}

/**
 * @param {boolean} x
 */
function assert(x) {
  if (!x) throw new Error("assert failed");
}

/**
 *  @typedef {(number|null)} numberOrNull
 */

/**
 * @type {number[]}
 */
 let array;

 const stack = [];

 /**
  * @type {number[]}
  */
 let stackElement;
