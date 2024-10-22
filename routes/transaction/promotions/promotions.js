import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const promotionRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/11/associated_promotion?qProductId=14244&q=byProduct&langId=-1
promotionRouter.get('/:storeId/associated_promotion', async (req, res) => {
  const { storeId, partNumber } = req.params;
  try {
    res.status(200).json({ "associatedPromotions": null });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default promotionRouter;
