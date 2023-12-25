import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey: string = 'n544OPmEEfV1HODvgljB31QiFYuxcPwZ';
  private URL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStory();
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((histo) => histo !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStore();
  }


  get tagsHistory() {
    return [... this._tagHistory];
  }

  private saveLocalStore(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStory(): void {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  }




  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '5')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.URL}/search?`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      })


  }
}
