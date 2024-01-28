import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books/books.service';
import { BookVolume } from '../models/book.model';
import { Network } from '@ngx-pwa/offline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  allSavedBooks: BookVolume[] = [];
  online$: Observable<boolean>;

  constructor(private booksService: BooksService, private network: Network) {
    this.online$ = this.network.onlineChanges;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.booksService.configurePreferences('library');
    await this.getAllSavedBooks();
  }

  sendData(bookId?: string) {
    if (bookId)
      this.booksService.bookId = bookId;
  }

  async getAllSavedBooks() {
    this.allSavedBooks = [];
    const allKeys = await this.booksService.getAllKeys();  // (await Preferences.keys()).keys;

    // load all books
    for (const key of allKeys) {
      const value: BookVolume = await this.booksService.getBook(key, true);
      if (value)
        this.allSavedBooks.push(value);
    }
  }

  async removeFromLibrary(bookId?: string) {
    if (bookId) {
      this.booksService.removeBook(bookId);
    }
  }

  async removeAllFromLibrary() {
    await this.booksService.clearAllBooks();
    await this.getAllSavedBooks();
  }

}
