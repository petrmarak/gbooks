import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  async configurePreferences(group: string) {
    await Preferences.configure({ group: group });
  }

  async setOption(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
  }

  async getOption(key: string, parse: boolean = true) {
    const { value } = await Preferences.get({ key: key });

    if (value && parse)
      return JSON.parse(value);
    else
      return value;
  }

  async removeOption(key: string) {
    await Preferences.remove({ key: key });
  }

  async isOptionStored(key: string): Promise<boolean> {
    const value = await this.getOption(key, false);
    return !!value;
  }

  async getAllKeys() {
    return (await Preferences.keys()).keys;
  }

  async clearAllOptions() {
    await Preferences.clear();
  }
}
