import { FileService } from './FileService.js';

export class CategoryService {
  static async getCategoryByIdentifier(_folder, identifier) {
    const filePath = FileService.getFilePath(_folder, `category/${identifier}.json`);
    const response = await FileService.readAndParseJSON(filePath);
    return response;
  }
  static async getCategoryById(_folder, id) {
    const filePath = FileService.getFilePath(_folder, `category/recommend-categories.json`);
    const response = await FileService.readAndParseJSON(filePath);
    const categoryFound = response.contents.find(category => category.id === id);
    return {
      contents: [categoryFound]
    };
  }

  static async getCategories(_folder) {
    const filePath = FileService.getFilePath(_folder, `category/categories.json`);
    const response = await FileService.readAndParseJSON(filePath);
    return response
  }
}