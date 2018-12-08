export default function scroller(controller, divsClass, oldCurrentSection) {
  const sectionsArray = document.querySelectorAll(`.${divsClass}`);
  let currentSection = oldCurrentSection.section;
  document.querySelector('.' + controller).addEventListener('click', move, true);

  function move(e) {
    // console.log(e);
    if (e.target.classList.contains('next') && currentSection < sectionsArray.length) {
      sectionsArray[++currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (e.target.classList.contains('next') && currentSection === sectionsArray.length) {
      currentSection = 0;
    } // eslint-disable-line

    // Same as above but for last section
    else if (e.target.classList.contains('previous') && currentSection === sectionsArray.length) {
      // debugger;
      currentSection--;
      sectionsArray[--currentSection].scrollIntoView({ behavior: 'smooth' });
    } else if (e.target.classList.contains('previous') && currentSection > 0) {
      // debugger;
      currentSection--;
      sectionsArray[--currentSection].scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Event to to run a function while scrolling to check for each section position
  window.addEventListener('scroll', updateCurrent);


  function updateCurrent(e) {
    // function that runs on each section while scrolling.
    sectionsArray.forEach((c) => {
      // check if more than half of the section is in view then update the
      // currentSection to reflect that
      if (c.getBoundingClientRect().top < (c.clientHeight / 10)
        && c.getBoundingClientRect().top > (-c.clientHeight / 10)) {
        currentSection = parseInt(c.id);
      }
    });
  }
}
