(function() {
  const button = document.querySelector('.button');
  const links = document.querySelectorAll('.js-link');
  const allSublists = document.querySelectorAll('.sublist');
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const overlay = document.querySelector('.overlay');
  let isSublistClicked = false;
  let openedSublist = undefined;


  root.style.setProperty('--border', 'white');
  header.style.setProperty('border', '1px solid var(--border)');

  window.addEventListener('scroll', function() {
    root.style.setProperty('--border', 'rgba(0,0,0,.09)');

    if (window.pageYOffset === 0) {
      root.style.setProperty('--border', 'white');
    };
  });

  /* mobile navigation */
  button.addEventListener('click', function() {
    header.classList.toggle('js-open');
    overlay.classList.toggle('js-open');

    if (header.classList.contains('js-open')) {
      root.style.setProperty('--border', 'rgba(0,0,0,.09)');
      allSublists.forEach(sublist => {
        sublist.classList.remove('js-list-open');
      });
    } else {
      root.style.setProperty('--border', 'white');
    };
  });


  /* expand or collapse sublist */
  function toggleSublist (event) {
    const thisSublist = this.querySelector('.sublist');

    if (event.target.matches('.link')) {

      // close previous sublist
      allSublists.forEach(sublist => {
        if (sublist !== thisSublist) {
          sublist.classList.remove('js-list-open');
        }
      });

      // open sublist and add overlay
      thisSublist.classList.add('js-list-open');
      overlay.classList.add('js-open');

      // variables to collapse sublist
      openedSublist = thisSublist;
      isSublistClicked = true;
    };
  };

  function collapseSublist (event) {
    if ((event.target === overlay) && isSublistClicked) {
      overlay.classList.remove('js-open');
      openedSublist.classList.remove('js-list-open');
    }
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {

      overlay.addEventListener('mouseover', function() {
        allSublists.forEach(sublist => {
          sublist.classList.remove('js-list-open');
        });
        overlay.classList.remove('js-open');
      });
    }
  });

  if (window.innerWidth >= 768) {
    links.forEach(link => link.addEventListener('mouseover', toggleSublist));
    window.addEventListener('mousemove', collapseSublist);
  } else {
    links.forEach(link => link.addEventListener('click', toggleSublist));
  }

})();
