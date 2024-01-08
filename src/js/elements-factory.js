const elementsFactory = (function() {
  function createElement(elementName, elementClass, elementText) {
    const newElement = document.createElement(elementName);
    if (elementClass !== null) {
      newElement.classList.add(elementClass);
    }
    if (elementText !== null) {
      newElement.innerText = elementText;
    }
    return newElement;
  }

  return {createElement}
})()