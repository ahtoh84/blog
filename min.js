
const targets = document.querySelectorAll('.bubble, .interstitial, .single-image');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("visible", entry.isIntersecting)
    })
  },
  { threshold: .2}
);
targets.forEach( target => {
  observer.observe(target)
});

