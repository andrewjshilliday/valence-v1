import { Directive, ElementRef, Renderer2, NgZone, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {

  intersectionObserver: IntersectionObserver;
  rootElement: HTMLElement;

  constructor( element: ElementRef, public renderer: Renderer2, public ngZone: NgZone) {
    this.rootElement = element.nativeElement;
  }

  init() {
    this.registerIntersectionObserver();

    this.observeDOMChanges(this.rootElement, () => {
      const images = this.getImages(this.rootElement);
      images.forEach((image: HTMLElement) => this.intersectionObserver.observe(image));
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  registerIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(images => images.forEach(image => this.onIntersectionChange(image)));
    return this.intersectionObserver;
  }

  observeDOMChanges(rootElement: HTMLElement, onChange: Function) {
    const observer = new MutationObserver(mutations => onChange(mutations));
    const observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
    observer.observe(rootElement, observerConfig);
    onChange();
    return observer;
  }

  getImages(pageNode: HTMLElement) {
    return Array.from(pageNode.querySelectorAll('img[data-src]'));
  }

  onIntersectionChange(image: any) {
    if (!image.isIntersecting) {
      return;
    }

    this.onImageAppearsInViewport(image.target);
  }

  onImageAppearsInViewport(image: any) {
    if (image.dataset.src) {
      this.renderer.setAttribute(image, 'src', image.dataset.src);
      this.renderer.removeAttribute(image, 'data-src');
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(image);
    }
  }
}
