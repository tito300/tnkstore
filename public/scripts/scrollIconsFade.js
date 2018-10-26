

export default function scrollerAnimation(sectionsArray, img, text, currentSection) {
  // Timer to solve scroll problem and catch values after scroll is done
  for (let x = 0; x < sectionsArray.length; x++) { // forEach doesn't accept breaks
    const bounding = sectionsArray[x].getBoundingClientRect();
    // setTimeout(() => {
    //   console.log(`top of section ${x} is: ${bounding.top}`);
    // }, 50);
    if ((bounding.top < 150 && bounding.top > -100 && sectionsArray[x + 1]) || (x === 0 && bounding.top >= 0)) {
        setTimeout(() => {  img.style.display = 'block'; text.style.display = 'block'; }, 20); //eslint-disable-line
      currentSection.section = x;
      console.log(currentSection);
      break;
    } else if (bounding.top < 150 && bounding.top > -100) {
      currentSection.section = x;
      break;
    }
  }
}
