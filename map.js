window.addEventListener('load', () => {
  const spacexLandingElems = Array.from(document.getElementsByClassName("spacexLanding"));
  spacexLandingElems.forEach(elem => {
    console.log(elem);
    elem.addEventListener('mouseover', () =>
      spacexLandingElems.forEach(elem1 => elem1.classList.add('mouseover')));
    elem.addEventListener('mouseleave', () =>
      spacexLandingElems.forEach(elem1 => elem1.classList.remove('mouseover')));
  });
});
