

export default function scrollerAnimation(sectionsArray, img, text) {
  setTimeout(() => { // Timer to solve scroll problem and catch values after scroll is done
    for (let x = 0; x < sectionsArray.length; x++) { // forEach doesn't accept breaks
      if (sectionsArray[x].getBoundingClientRect().top < 150
      && sectionsArray[x].getBoundingClientRect().top > -100 && sectionsArray[x + 1]) {
        setTimeout(() => { img.style.display = 'block'; text.style.display = 'block'; }, 20); //eslint-disable-line

        break;
      }
    }
  }, 1000);
}
