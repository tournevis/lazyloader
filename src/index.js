/*

Forked From https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/helpers/lazy-load-images.js

*/

'use strict'

class LazyLoader {

  static get SUPPORTS_INTERSECTION_OBSERVER () {
     return ('IntersectionObserver' in window)
   }

  static get HANDLED_CLASS () {
    return 'js-lazy-loaded'
  }

  static get DEFAULT_CLASS () {
    return 'js-lazy-image'
  }

  static get THRESHOLD () {
    return 0.01
  }

  static init (config, callback) {
      var that = this

 }
 static init( config, callback) {
   if(this._instance){
     this._instance.forEach(instance => {
       if (instance.type == config.type) {
         instance._disconnect()
       }
     })
   } else {
     this._instance = []
   }
  this._count = 0
  if(document.readyState === "complete") {
    this._instance.push(new LazyLoader(config))
  } else {
    window.addEventListener("DOMContentLoaded", ()=>{this._instance.push(new LazyLoader(config))})
  }
 }
  constructor(config) {
    switch (config.type) {
      case 'images':
      this._initImages(config)
        break
      case 'custom':
      this._initCustom(config)
        break
      default:
      this._initImages()
    }

  }
  _disconnect () {
    if (!this._observer) {
      return
    }

    this._observer.disconnect()
  }

  _onIntersection (entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 0.05) {
        return
      }
      this._count--
      this._observer.unobserve(entry.target)
      this._config.type === 'images'  && this._preloadImage(entry.target)
      if (this._config.type === 'custom' && typeof this._config.callback === 'function') this._config.callback(entry.target)
      else console.err('LazyLoader callback must be a function')
      entry.target.classList.add(LazyLoader.HANDLED_CLASS)
    })

    if (this._count > 0) {
      return
    }
    this._observer.disconnect()
  }

  _importModule () {
    if (this.type === 'module') {/* import(  `${this.name}` ).then(module =>{ console.log('hello')})*/}
  }
  _initCustom(config) {

    this._config = {
      rootMargin: '0px 0px',
      threshold: LazyLoader.THRESHOLD,
      ...config
    }

    const els = document.querySelectorAll(`.${this._config.class}`)

    if (!els) {
      console.warn('No Elements Founds')
      return
    }

    if (!LazyLoader.SUPPORTS_INTERSECTION_OBSERVER) {
      typeof this._config.callback === 'function' && this._config.callback('Error: INTERSECTION_OBSERVER isn\'t supported by your navigator')
      return
    }
    this._count = els.length
    this._onIntersection = this._onIntersection.bind(this)
    this._observer = new IntersectionObserver(this._onIntersection, { root: null, rootMargin: this._config.rootMargin,threshold: this._config.threshold})
    els.forEach(el => {
      if (el.classList.contains(LazyLoader.HANDLED_CLASS)) {
        return
      }
      this._observer.observe(el)
    })
  }
  _buildThresholdList() {
    var thresholds = []
    var numSteps = 10
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps
      thresholds.push(ratio)
    }

    thresholds.push(0)
    return thresholds
  }
  _initImages () {
    const images = document.querySelectorAll(`.${LazyLoader.DEFAULT_CLASS}`)
    this._config = {
      // If the image gets within 50px in the Y axis, start the download.
      rootMargin: '0px',
      threshold: LazyLoader.THRESHOLD
    }

    if (!LazyLoader.SUPPORTS_INTERSECTION_OBSERVER) {
      console.log('INTERSECTION_OBSERVER isn\'t supported by your navigator');
      this._loadImagesImmediately(images);
      return
    }

    this._count = images.length
    this._onIntersection = this._onIntersection.bind(this)
    this._observer = new IntersectionObserver(this._onIntersection, this._config)
    images.forEach(image => {
      if (image.classList.contains(LazyLoader.HANDLED_CLASS)) {
        return
      }

      this._observer.observe(image)
    })
  }

  _preloadImage (image) {
    const src = image.dataset.src
    if (!src) {
      return
    }
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = src
      image.onload = resolve
      image.onerror = reject
    }).then(_ => this._applyImage(image, src))
  }


  _loadImagesImmediately (images) {
    Array.from(images).forEach(image => this._preloadImage(image))
  }

  _applyImage (img, src) {
    const el = img.querySelector('.js-lazy-image-content')
    if (!el) {
      return
    }
    el.style.backgroundImage = `url(${src})`
    el.classList.add('fade-in')
  }
}

export default LazyLoader
