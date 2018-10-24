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

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  init() {
    this.registerIntersectionObserver();
    this.observeDOMChanges(this.rootElement, () => {
      const images = this.rootElement.querySelectorAll('img[data-src]');
      images.forEach((image: HTMLElement) => this.intersectionObserver.observe(image));
    });
  }

  registerIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(images => images.forEach(image => this.onIntersectionChange(image)));
  }

  observeDOMChanges(rootElement: HTMLElement, onChange: Function) {
    const observer = new MutationObserver(mutations => onChange(mutations));
    observer.observe(rootElement, { childList: true, subtree: true });
  }

  onIntersectionChange(image: any) {
    if (image.isIntersecting) {
      this.onImageAppearsInViewport(image.target);
    }
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
