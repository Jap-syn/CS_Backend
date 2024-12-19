export default class CityNotFoundException extends Error {
    constructor(id: string) {
      super(`City with ID ${id} not found`);
      this.name = 'CityNotFoundException';
    }
  }
  