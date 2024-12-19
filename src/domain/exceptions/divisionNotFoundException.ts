export default class DivisionNotFoundException extends Error {
    constructor(id: string) {
      super(`Division with ID ${id} not found`);
      this.name = 'DivisionNotFoundException';
    }
  }
  