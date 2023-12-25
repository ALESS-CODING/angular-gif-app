import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public URL!: string;

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.URL) throw new Error('el URL esta vacio ');
  }

  onLoad(): void {
    console.log("imagne cargado");
    this.hasLoaded = true;
  }


}
