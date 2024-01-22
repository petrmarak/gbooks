import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BooksService } from './services/books/books.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  booksResultArray: any[] = [];
  bookSearchString: string = "";
  volumeResult: any;

  constructor(public httpClient: HttpClient, private booksService: BooksService) {}

  /**
   * Searches for books according to a search term.
   * @param bookSearchString The search term.
   */
  performSearch(bookSearchString: string) {
    this.booksResultArray = [];

    const url = `${environment.baseUrl}?q=${bookSearchString}&key=${environment.apiKey}`;  // potenciálně doplnit inauthor
    this.httpClient.get(url).subscribe(data => {
      // console.log(data);
      this.booksResultArray.push(data);
    });
  }

  /**
   * Give data about a specific book into service.
   * @param bookId Book id.
   */
  async sendData(bookId: string) {
    this.booksService.data = bookId;
  }

}
