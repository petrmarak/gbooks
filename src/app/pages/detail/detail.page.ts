import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BooksService } from 'src/app/services/books/books.service';
import { BookVolume } from 'src/app/models/book.model';

import ISO6391 from "iso-639-1";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  isLoading: boolean = false;
  bookId: any;
  allData: any[] = [];
  
  book: BookVolume = {} as BookVolume;
  isSaved: boolean = false;
  allBooksInLibrary: BookVolume[] = [];
  accessViewStatus: string = "";

  constructor(private httpClient: HttpClient, private booksService: BooksService) { }

  async ngOnInit() {
    this.isLoading = true;
    this.bookId = this.booksService.bookId;
    this.allData = [];

    await this.booksService.configurePreferences('library');

    // get info about a specific book
    const url = `${environment.baseUrl}/${this.bookId}?key=${environment.apiKey}`;

    this.httpClient.get(url).subscribe(async data => {
      this.allData.push(data);
      this.book = this.allData[0];

      console.log('My detail data: ');
      console.log(this.book);

      // determines which button will be visible
      this.isSaved = await this.booksService.isBookStored(this.bookId);

      // get access type for online reading
      if (this.book.accessInfo?.accessViewStatus) {
        if (this.book.accessInfo.accessViewStatus == "FULL_PURCHASED" || this.book.accessInfo.accessViewStatus == "FULL_PUBLIC_DOMAIN")
          this.accessViewStatus = "full book";
        else if (this.book.accessInfo.accessViewStatus == "SAMPLE")
          this.accessViewStatus = "sample";
        else
          this.accessViewStatus = "NONE";
      }
      this.isLoading = false;
    });
  }

  async ionViewDidEnter() {
    this.isSaved = await this.booksService.isBookStored(this.bookId);
  }

  async addToLibrary() {
    if (!this.book.volumeInfo)
      return;

    await this.booksService.setBook(this.bookId, this.book);
    this.isSaved = true;
  }

  async removeFromLibrary() {
    this.booksService.removeBook(this.bookId);
    this.isSaved = false;
  }

  getLanguageName(langCode?: string) {
    let langName = "";
    if (langCode) {
      langName = ISO6391.getName(langCode);
      if (langName)
        return langName;
      else  // name was not found for the langCode, so at least show the langCode itself
        return langCode;
    }
    else {
      return "";
    }
  }
}
