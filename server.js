// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Route xử lý mọi yêu cầu theo dạng /<taxCode>
app.get('/:taxCode', async (req, res) => {
  const taxCode = req.params.taxCode;
  const url = `https://hoadondientu.gdt.gov.vn:30000/category/public/dsdkts/${taxCode}/manager`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(`Lỗi gọi đến GDT với taxCode ${taxCode}:`, err.message);
    res.status(500).json({
      error: 'Không lấy được dữ liệu từ GDT',
      detail: err.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server proxy đang chạy tại cổng ${PORT}`);
});
