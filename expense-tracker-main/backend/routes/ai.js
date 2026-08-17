const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/scan-receipt', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a receipt image.' });
    }

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `Analyze this receipt image and return a JSON object with:
    - title (string: merchant/store name)
    - amount (number: total price)
    - date (string: YYYY-MM-DD)
    - category (string: e.g. Food, Groceries, Shopping, Entertainment, Utilities, Transport, or Other)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [prompt, imagePart],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsedData = JSON.parse(response.text);
    res.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('Error parsing receipt with AI:', error);
    res.status(500).json({ error: 'Failed to process receipt with AI.' });
  }
});

module.exports = router;