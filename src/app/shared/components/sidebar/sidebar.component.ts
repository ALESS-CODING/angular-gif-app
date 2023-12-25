import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {



  constructor(private gifsService: GifsService) { }

  get listGifs() {
    return this.gifsService.tagsHistory
  }

  searchGif(text: string): void {
    this.gifsService.searchTag(text)
  }


}
