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
  allFavoriteBooks: BookVolume[] = [];
  online$: Observable<boolean>;

  constructor(private booksService: BooksService, private network: Network) {
    this.online$ = this.network.onlineChanges;
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.booksService.configurePreferences('favorites');
    await this.getAllFavorites();
  }

  sendData(bookId?: string) {
    if (bookId)
      this.booksService.bookId = bookId;
  }

  async getAllFavorites() {
    this.allFavoriteBooks = [];
    const allKeys = await this.booksService.getAllKeys();  // (await Preferences.keys()).keys;

    // load all books
    for (const key of allKeys) {
      const value: BookVolume = await this.booksService.getBook(key, true);
      if (value)
        this.allFavoriteBooks.push(value);
    }
  }

  async removeFromFavorites(bookId?: string) {
    if (bookId) {
      this.booksService.removeBook(bookId);
    }
  }

}
