var viewPort = document.getElementById('viewPort');

let dropDowns = Array.from(document.querySelectorAll('.btnReady'));

const handleClick = (e) => {
  e.preventDefault();
  dropDowns.forEach(node => {
    node.classList.remove('selBtn');
  });
  e.currentTarget.classList.add('selBtn');
  viewPort.src = e.currentTarget.getAttribute('data-viewPortURL');
  document.title = "Futur3Sn0w | " + e.currentTarget.getAttribute('data-navBtn');
}

dropDowns.forEach(node => {
  node.addEventListener('click', handleClick)
});