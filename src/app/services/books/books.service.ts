import { Injectable } from '@angular/core';
import { BookVolume } from 'src/app/models/book.model';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  data: any;
  bookId: string = "";

  constructor() { }

  async configurePreferences(group: string) {
    await Preferences.configure({ group: group });
  }

  async setBook(bookId: string, book: BookVolume) {
    await Preferences.set({
      key: bookId,
      value: JSON.stringify(book)
    });
  }

  async getBook(bookId: string, parse: boolean = true) {
    const { value } = await Preferences.get({ key: bookId });

    if (value && parse)
      return JSON.parse(value);
    else
      return value;
  }

  async removeBook(bookId: string) {
    await Preferences.remove({ key: bookId });
  }

  /**
   * Check if a book is currently stored in Preferences.
   * @param bookId Book ID.
   * @returns true or false
   */
  async isBookStored(bookId: string): Promise<boolean> {
    const value = await this.getBook(bookId, false);
    return !!value;
  }

  async getAllKeys() {
    return (await Preferences.keys()).keys;
  }

  async clearAllBooks() {
    await Preferences.clear();
  }
}
