import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BooksService } from 'src/app/services/books/books.service';
import { BookVolume } from 'src/app/models/book.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  bookId: any;
  allData: any[] = [];
  
  book: BookVolume = {} as BookVolume;
  isFavorite: boolean = false;
  allFavoriteBooks: BookVolume[] = [];

  constructor(public httpClient: HttpClient, private booksService: BooksService) { }

  async ngOnInit() {
    this.bookId = this.booksService.bookId;
    this.allData = [];
    await this.booksService.configurePreferences('favorites');

    // get info about a specific book
    const url = `${environment.baseUrl}/${this.bookId}?key=${environment.apiKey}`;

    this.httpClient.get(url).subscribe(async data => {
      this.allData.push(data);
      this.book = this.allData[0];

      console.log('My detail data: ');
      console.log(this.book);

      // determines which button will be visible
      this.isFavorite = await this.booksService.isBookStored(this.bookId);
      console.warn('Is this book stored: ' + this.isFavorite);
    });
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

  async addToFavorites() {
    if (!this.book.volumeInfo) {
      return;
    }

    await this.booksService.setBook(this.bookId, this.book);
    this.isFavorite = true;

    // TEST
    await this.getAllFavorites();
    console.warn('Number of favorite books saved: ' + this.allFavoriteBooks.length);
  }

  async removeFromFavorites() {
    this.booksService.removeBook(this.bookId);
    this.isFavorite = false;

    // TEST
    await this.getAllFavorites();
    console.warn('Number of favorite books saved: ' + this.allFavoriteBooks.length);
  }

}
