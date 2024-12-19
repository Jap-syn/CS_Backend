export default class BusinessTypeNotFoundException extends Error {
    constructor(id: string) {
      super(`BusinessType with ID ${id} not found`);
      this.name = 'BusinessTypeNotFoundException';
    }
  }
  