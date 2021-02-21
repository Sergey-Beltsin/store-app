export const getElementStyles = (button) => {
  const buttonClass = button.classList[0];
  const buttonElement = document.getElementsByClassName(buttonClass);
  return window.getComputedStyle(buttonElement[0]);
};
