import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModalController } from '@ionic/angular';
import { SearchOptionsModalComponent } from './search-options-modal/search-options-modal.component';

import { environment } from 'src/environments/environment';
import { BooksService } from '../services/books/books.service';
import { SearchService } from '../services/search/search.service';

import { Network } from '@ngx-pwa/offline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLoading: boolean = false;
  booksResultArray: any[] = [];
  bookSearchString: string = "";
  authorSearchString: string = "";
  searchOptions: string = "";

  online$: Observable<boolean>;

  constructor(private httpClient: HttpClient, private modalCtrl: ModalController, private booksService: BooksService, 
    private searchService: SearchService, private network: Network) {
    this.online$ = this.network.onlineChanges;
  }

  /**
   * Searches for books according to a search term.
   * @param bookSearchString The search term.
   */
  async performSearch(bookSearchString: string, authorSearchString: string) {
    this.isLoading = true;
    this.booksResultArray = [];

    if (!bookSearchString && !authorSearchString) {
      this.moveSearchCenter();
      this.isLoading = false;
      return;
    }

    const loadStoredOptions = async () => {
      this.searchOptions = "";
      await this.searchService.configurePreferences("searchOptions");

      const langRestrict = await this.searchService.getOption("langRestrict");
      if (langRestrict)
        this.searchOptions += `&langRestrict=${langRestrict}`;

      const maxResults = await this.searchService.getOption("maxResults");
      if (maxResults)
        this.searchOptions += `&maxResults=${maxResults}`;

      const orderByNewest = await this.searchService.getOption("orderByNewest");
      if (orderByNewest)
        this.searchOptions += `&orderBy=newest`;
      else
        this.searchOptions += `&orderBy=relevance`;

      const printType = await this.searchService.getOption("printType");
      if (printType)
        this.searchOptions += `&printType=${printType}`;
    }

    let authorSearchParam: string = "";
    if (authorSearchString) {
      authorSearchParam = `+inauthor:${authorSearchString}`;
    }

    await loadStoredOptions();

    // example of the URL: https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&maxResults=15&key=yourAPIKey
    const url = `${environment.baseUrl}?q=${bookSearchString}${authorSearchParam}${this.searchOptions}&showPreorders=true&key=${environment.apiKey}`;
    console.log("The search URL: " + url);
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
    const appIconElement = document.getElementById('app-icon');
    const mainTitleElement = document.getElementById('main-title');

    if (containerElement) {
      containerElement.style.top = '0%';
      containerElement.style.transform = 'translateY(0%)';
    }
    if (appIconElement) {
      appIconElement.style.display = 'none';
    }
    if (mainTitleElement) {
      mainTitleElement.style.display = 'none';
    }
  }

  moveSearchCenter() {
    const containerElement = document.getElementById('container');
    const appIconElement = document.getElementById('app-icon');
    const mainTitleElement = document.getElementById('main-title');

    if (containerElement) {
      containerElement.style.top = '50%';
      containerElement.style.transform = 'translateY(-50%)';
    }
    if (appIconElement) {
      appIconElement.style.display = 'inline-block';
    }
    if (mainTitleElement) {
      mainTitleElement.style.display = 'inline-block';
    }
  }

  async openSearchOptionsModal() {
    const modal = await this.modalCtrl.create({
      component: SearchOptionsModalComponent
    });

    await modal.present();
  }

}
