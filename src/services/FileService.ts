import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises;

export class FileUtil {
  // Leer archivo de manera asíncrona
  static async readFile(filePath) {
    try {
      const data = await fsPromises.readFile(filePath, "utf8");
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo: ${error.message}`);
    }
  }

  // Escribir en un archivo de manera asíncrona
  static async writeFile(filePath, content) {
    try {
      await fsPromises.writeFile(filePath, content, "utf8");
    } catch (error) {
      throw new Error(`Error al escribir el archivo: ${error.message}`);
    }
  }

  // Convertir contenido de un archivo JSON en un objeto
  static async readAndParseJSON(filePath) {
    try {
      const data = await this.readFile(filePath);
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error al parsear el JSON: ${error.message}`);
    }
  }

  // Guardar un objeto como archivo JSON
  static async saveJSON(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2); // Formateado para una lectura más limpia
      await this.writeFile(filePath, jsonData);
    } catch (error) {
      throw new Error(`Error al guardar el archivo JSON: ${error.message}`);
    }
  }

  // Obtener la ruta absoluta de un archivo
  static getFilePath(folder, filename) {
    return path.resolve(__dirname, `../data/${folder}/${filename}`);
  }
}
