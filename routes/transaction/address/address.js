import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { addFolder } from '../../../middleware/auth.js';
import { getAddressBook } from '../../../services/shipping.js';

const addressRouter = express.Router()
const fsPromises = fs.promises;
// Obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /wcs/resources/store/9701/person/addressInfoByType/BLOQUE_O_INTERIOR
addressRouter.get('/:storeId/person/addressInfoByType/:addressType', async (req, res) => {
	try {
		const { storeId, addressType } = req.params;
		const filePath = path.resolve(__dirname, `../../../data/${storeId}-store/address-info/${addressType}.json`);
		const data = await fsPromises.readFile(filePath, 'utf8');
		const response = JSON.parse(data);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({});
	}
});

// /wcs/resources/store/41/person/@self/contact?addressType=Billing
addressRouter.get('/:storeId/person/@self/contact', addFolder, async (req, res) => {
	const _folder = req.storeIdentifier;
	const addressBook = await getAddressBook(req.params.storeId);
	console.log('addressBook: ', addressBook);
	res.status(200).json({
		resourceId:
			"https://commerce-preview.sbx0394.play.hclsofy.com:5443/wcs/resources/store/41/person/@self/contact?addressType=Shipping",
		contact: addressBook,
		resourceName: "person",
		userId: "17",
	});
});

// /wcs/resources/store/41/person/@self/checkoutProfile?langId=-1&responseFormat=json
addressRouter.get('/:storeId/person/@self/checkoutProfile', async (req, res) => {
	res.status(200).json({
		"resourceId": "https:\/\/commerce-preview.sbx0394.play.hclsofy.com:5443\/wcs\/resources\/store\/41\/person\/@self\/checkoutProfile?langId=-1&responseFormat=json",
		"resourceName": "person",
		"userId": "17"
	});
});

// /wcs/resources/store/9701/person/@self/contact/mi%20oficina
addressRouter.put('/:storeId/person/@self/contact/:nickName', async (req, res) => {
	res.status(200).json({ "resourceName": "person", "addressId": "3074457362978450855" });
});

// /wcs/resources/store/9701/person/@self/contact
addressRouter.post('/:storeId/person/@self/contact', async (req, res) => {
	// res.status(200).json({ "resourceName": "person", "addressId": "3074457362978450855" });
	res.status(400).json({
		"errors": [
			{
				"errorKey": "_ERR_NICKNAME_ALREDY_EXIST",
				"errorParameters": "empresa",
				"errorMessage": "El apodo que ha especificado ya existe. Escriba otro nombre en el campo Apodo e int\u00e9ntelo de nuevo.",
				"errorCode": "5040"
			}
		]
	})
});

export default addressRouter;
