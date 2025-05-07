import path from "node:path";
import fs from "node:fs";

const fsPromises = fs.promises;

export class FsUtil {
  static async read(filePath: string) {
    try {
      const data = await fsPromises.readFile(filePath, "utf8");
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al leer el archivo: ${error.message}`);
      }
      throw new Error(`Error al leer el archivo`);
    }
  }

  static async write(filePath: string, content: string | Buffer) {
    try {
      await fsPromises.writeFile(filePath, content, "utf8");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al escribir el archivo: ${error.message}`);
      }
      throw new Error(`Error desconocido al escribir el archivo.`);
    }
  }

  static async readAndParseJSON(filePath: string) {
    try {
      const data = await this.read(filePath);
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        // throw new Error(`Error al parsear el JSON: ${error.message}`);
        console.log(`Error al parsear el JSON: ${error.message}`);
      }
      // throw new Error(`Error al parsear el JSON`);
      return undefined;
    }
  }

  static async saveJSON(filePath: string, data: unknown) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await this.write(filePath, jsonData);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Error al guardar el archivo JSON: ${err.message}`);
    }
  }

  static getFilePath(folder: string, filename: string) {
    return path.resolve(process.cwd(), "src", "data", folder, filename);
  }
  static getSearchPath(folder: string, filename: string) {
    return path.resolve(
      process.cwd(),
      "src",
      "data",
      folder,
      "search",
      filename
    );
  }
}
