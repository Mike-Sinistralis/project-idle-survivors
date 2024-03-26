export const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    // Clear the previous timeout, if any, to reset the debounce timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to execute the function after the delay
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
