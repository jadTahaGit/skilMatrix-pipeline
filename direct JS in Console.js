// get all tr elements
let trElements = document.querySelectorAll('tr');

// function to simulate click
function simulateClick(elem) {
  // Create our event (with options)
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
}

// delay function returns a promise
function delay(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// Use an async IIFE to handle the async/await
(async function () {
  for (let tr of trElements) {
    // find the a element within each tr
    let aElement = tr.querySelector('.filename-column p a');

    if (aElement) {
      // log the text inside the a element
      console.log(aElement.textContent);

      // simulate a click on the a element
      simulateClick(aElement);

      // wait for 10 seconds
      await delay(2000);
    }
  }
})();
