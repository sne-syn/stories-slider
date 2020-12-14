class SlideStories {
  constructor(id) {
    this.active = 0;
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.items = this.slide.querySelectorAll('.stories__item');
    this._activeSlide = this._activeSlide.bind(this);
    this._addNavigation = this._addNavigation.bind(this);
    this._addThumbItems = this._addThumbItems.bind(this);
    this._autoSlide = this._autoSlide.bind(this);
    this._addProgressBar = this._addProgressBar.bind(this);
    this._prev = this._prev.bind(this);
    this._next = this._next.bind(this);
    this.init = this.init.bind(this);
    this.close = this.close.bind(this);
  }

  _activeSlide(index) {
    this.active = index;
    this.items = this.slide.querySelectorAll('.stories__item');
    this.items.forEach((item) => item.classList.remove('stories__item--active'));
    this.items[index].classList.add('stories__item--active');
    this.thumbItems.forEach((item) => {
      item.classList.remove('stories__thumb--active');
    });
    this.thumbItems[index].classList.add('stories__thumb--active');
    this._autoSlide();
  }

  _prev() {
    if (this.active > 0) {
      this._activeSlide(this.active - 1);
    } else {
      this._autoSlide();
    }
  }

  _next() {
    if (this.active < this.items.length - 1) {
      this._activeSlide(this.active + 1);
    }
  }

  _addNavigation() {
    const nextButton = this.slide.querySelector('.stories__button--next');
    const prevButton = this.slide.querySelector('.stories__button--prev');
    nextButton.addEventListener('click', this._next);
    prevButton.addEventListener('click', this._prev);
  }

  _addThumbItems() {
    this.items = this.slide.querySelectorAll('.stories__item');
    this.thumbs = this.slide.querySelector('.stories__thumbs');
    this.thumbs.innerHTML = '';
    this.items.forEach(() => {
      this.thumbs.innerHTML += `<span class="stories__thumb"></span>`
    });
    this.thumbItems = this.thumbs.querySelectorAll('.stories__thumb');
  }

  _autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this._next, 5000);
    this.thumbItems.forEach((item) => {
      if (item.hasChildNodes()) {
        item.innerHTML = '';
      }
    });
    this._addProgressBar();
  }

  _addProgressBar() {
    const progressBar = document.createElement('span');
    const activeSlideThumb = this.slide.querySelector('.stories__thumb--active');
    progressBar.classList.add('stories__progressbar');
    if (activeSlideThumb) {
      activeSlideThumb.appendChild(progressBar);
    }
  }

  init() {
    this.slide.classList.add('stories__collection--show');
    this._addThumbItems();
    this._activeSlide(0);
    this._addNavigation();
  }

  close() {
    this.slide.classList.remove('stories__collection--show');
    this._autoSlide();
  }
}

const buttons = document.querySelectorAll('.card__button');
buttons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    const allStories = document.querySelectorAll('.stories__collection');
    allStories.forEach((story) => story.classList.remove('stories__collection--show'))
    const stories = new SlideStories(`${evt.target.id}`);
    stories.init();
  });
})
