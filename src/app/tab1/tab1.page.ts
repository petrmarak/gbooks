import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  foundBooksArray: any[] = [];
  bookSearchString: String = "";

  constructor(public httpClient: HttpClient) {}

  performSearch(bookSearchString: String) {
    this.foundBooksArray = [];

    const url = `${environment.baseApiUrl}?q=${bookSearchString}&key=${environment.apiKey}`;  // potenciálně doplnit inauthor
    this.httpClient.get(url).subscribe(data => {
      console.log(data);
      this.foundBooksArray.push(data);
    });

  }

}
