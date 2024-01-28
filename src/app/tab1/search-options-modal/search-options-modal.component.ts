import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchService } from 'src/app/services/search/search.service';

import ISO6391 from "iso-639-1";

@Component({
  selector: 'app-search-options-modal',
  templateUrl: './search-options-modal.component.html',
  styleUrls: ['./search-options-modal.component.scss'],
})
export class SearchOptionsModalComponent {
  ISO6391 = ISO6391;
  allLanguages: string[] = [];

  langRestrict: string = "";
  maxResults: number = 10;
  orderByNewest: boolean = false;
  printType: string = "all";

  constructor(private modalCtrl: ModalController, private searchService: SearchService) {
    this.allLanguages = ISO6391.getAllNames();

    const getStoredOptions = async () => {
      await searchService.configurePreferences("searchOptions");

      const langRestrict = await searchService.getOption("langRestrict");
      if (langRestrict)
        this.langRestrict = langRestrict;

      const maxResults = await searchService.getOption("maxResults");
      if (maxResults)
        this.maxResults = maxResults;

      const orderByNewest = await searchService.getOption("orderByNewest");
      if (orderByNewest)
        this.orderByNewest = orderByNewest;

      const printType = await searchService.getOption("printType");
      if (printType) {
        this.printType = printType;
      }
    }

    getStoredOptions();
  }

  async submitModal() {
    this.searchService.setOption("langRestrict", this.langRestrict);
    this.searchService.setOption("maxResults", this.maxResults);
    this.searchService.setOption("orderByNewest", this.orderByNewest);
    this.searchService.setOption("printType", this.printType);

    await this.modalCtrl.dismiss();
  }

  async dismissModal() {
    await this.modalCtrl.dismiss(null, "cancel");
  }

}
