import { getSeoIdentifier } from "@controllers/search/seo/seo";
import { addFolder } from "@middleware/auth";
import express from "express";

const app = express();
const seoUrlRouter = app.router;

// /search/resources/api/v2/urls?storeId=11&identifier=home
seoUrlRouter.get("/urls", addFolder, getSeoIdentifier);
// seoUrlRouter.get("/urlsxx", async (req, res) => {
//   const { storeId, identifier } = req.query;
//   console.log("identifier: ", identifier);
//   const filePath = path.resolve(
//     __dirname,
//     `../../../data/${storeId}-store/layouts/${identifier}.json`
//   );
//   console.log("URL filePath: ", filePath);
//   // read file
//   try {
//     const data = await fsPromises.readFile(filePath, "utf8");
//     const response = JSON.parse(data);
//     res.status(200).json(response);
//   } catch (error) {
//     console.log("error: ", error);
//     res.status(200).json({ contents: [] });
//   }
// });

export default seoUrlRouter;
