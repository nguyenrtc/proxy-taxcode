// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/get-taxpayer/:taxCode', async (req, res) => {
  const taxCode = req.params.taxCode;
  const url = `https://hoadondientu.gdt.gov.vn:30000/category/public/dsdkts/${taxCode}/manager`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được dữ liệu', detail: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server đang chạy tại cổng ${PORT}`);
});
