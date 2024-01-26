import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../services/books/books.service';
import { Network } from '@ngx-pwa/offline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  booksResultArray: any[] = [];
  bookSearchString: string = "";
  online$: Observable<boolean>;
  isLoading: boolean = false;

  constructor(private httpClient: HttpClient, private booksService: BooksService, private network: Network) {
    this.online$ = this.network.onlineChanges;
  }

  /**
   * Searches for books according to a search term.
   * @param bookSearchString The search term.
   */
  performSearch(bookSearchString: string) {
    this.isLoading = true;
    this.booksResultArray = [];

    if (!bookSearchString) {
      this.moveSearchCenter();
      this.isLoading = false;
      return;
    }

    const url = `${environment.baseUrl}?q=${bookSearchString}&key=${environment.apiKey}`;  // potenciálně doplnit inauthor
    this.httpClient.get(url).subscribe(data => {
      // console.warn(data);
      this.booksResultArray.push(data);
      this.isLoading = false;
    });

    this.moveSearchTop();
  }

  /**
   * Send data about a specific book into service.
   * @param bookId Book id.
   */
  sendData(bookId: string) {
    this.booksService.bookId = bookId;
  }

  moveSearchTop() {
    const containerElement = document.getElementById('container');
    const searchBookIconElement = document.getElementById('search-book-icon');

    if (containerElement) {
      containerElement.style.top = '0%';
      containerElement.style.transform = 'translateY(0%)';
    }
    if (searchBookIconElement) {
      searchBookIconElement.style.display = 'none';
    }
  }

  moveSearchCenter() {
    const containerElement = document.getElementById('container');
    const searchBookIconElement = document.getElementById('search-book-icon');

    if (containerElement) {
      containerElement.style.top = '50%';
      containerElement.style.transform = 'translateY(-50%)';
    }
    if (searchBookIconElement) {
      searchBookIconElement.style.display = 'inline-block';
    }
  }

}
