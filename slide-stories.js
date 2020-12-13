class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;

    this._activeSlide = this._activeSlide.bind(this);
    this._addNavigation = this._addNavigation.bind(this);
    this._addThumbItems = this._addThumbItems.bind(this);
    this._autoSlide = this._autoSlide.bind(this);
    this._addProgressBar = this._addProgressBar.bind(this);
    this._prev = this._prev.bind(this);
    this._next = this._next.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  _activeSlide(index) {
    this.active = index;
    this.items = this.slide.querySelectorAll('.slide-image');
    this.items.forEach((item) => item.classList.remove('slide-image--active'));
    this.items[index].classList.add('slide-image--active');
    this.thumbItems.forEach((item) => {
      item.classList.remove('slide-thumb--active');
    });
    this.thumbItems[index].classList.add('slide-thumb--active');
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
    const nextButton = this.slide.querySelector('.slide-next');
    const prevButton = this.slide.querySelector('.slide-prev');
    nextButton.addEventListener('click', this._next);
    prevButton.addEventListener('click', this._prev);
  }

  _addThumbItems() {
    this.items.forEach(() => this.thumbs.innerHTML += `<span class="slide-thumb"></span>`);
    this.thumbItems = this.thumbs.querySelectorAll('.slide-thumb');
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
    const activeSlideThumb = this.slide.querySelector('.slide-thumb--active');
    progressBar.classList.add('slide-progressbar');
    if (activeSlideThumb) {
      activeSlideThumb.appendChild(progressBar);
    }  
  }

  init() {
    this.items = this.slide.querySelectorAll('.slide-image');
    this.thumbs = this.slide.querySelector('.slide-thumbs');
    this._addThumbItems()
    this._activeSlide(0);
    this._addNavigation();
  }
}

const buttons = document.querySelectorAll('.card-button');
buttons.forEach((btn) => {
  btn.addEventListener('click', (evt) => new SlideStories(`slide-${evt.target.id}`))
})
