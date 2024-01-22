import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';
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

  constructor(public httpClient: HttpClient, private booksService: BooksService) { }

  ngOnInit() {
    this.bookId = this.booksService.data;
    this.allData = [];

    // get info about a specific book
    const url = `${environment.baseUrl}/${this.bookId}?key=${environment.apiKey}`;

    this.httpClient.get(url).subscribe(data => {
      this.allData.push(data);
      this.book = this.allData[0];
      
      console.log('My detail data: ');
      console.log(this.book);
    });

  }
}
