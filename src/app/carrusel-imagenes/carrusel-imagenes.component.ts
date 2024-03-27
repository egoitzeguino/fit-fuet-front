import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel-imagenes',
  templateUrl: './carrusel-imagenes.component.html',
  styleUrls: ['./carrusel-imagenes.component.scss']
})
export class CarruselImagenesComponent implements OnInit {
  public rutaImagenes: string = 'assets/images/carrusel/'

  images: string[] = ['batman.jpg', 'superman.webp', 'spiderman.jpg'];

  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
}
