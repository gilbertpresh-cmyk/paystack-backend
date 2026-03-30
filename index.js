import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/verify", async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.json({ success: false });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: "Bearer sk_test_89ebc3298b782d4f7466fc98495579577be8d7e7"
      }
    });

    const data = await response.json();

    if (data.data.status === "success") {
      return res.json({
        success: true,
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
    }

    return res.json({ success: false });

  } catch (err) {
    return res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));