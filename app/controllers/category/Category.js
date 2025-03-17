import { CategoryService } from "../../services/Category.js";

export class CategoryController {
  static async getCategory(req, res) {
    const _folder = req._folder;
    console.log('_folder*-: ', _folder);
    const { identifier, id } = req.query;

    try {
      if (identifier) {
        const data = await CategoryService.getCategoryByIdentifier(_folder, identifier);
        res.status(200).json(data);
      } else if (id) {
        const data = await CategoryService.getCategoryById(_folder, id);
        res.status(200).json(data);
      } else {
        const data = await CategoryService.getCategories(_folder);
        res.status(200).json(data);
      }
    } catch (error) {
      console.log('error: ', error);
      res.status(200).json({ contents: [] });
    }
  }
}