const {
  insertVoucher,
  getVoucherByCode,
} = require("../models/voucherModel");
const { generateVoucherPDF } = require("../helpers/pdfHelper");
const QRCode = require("qrcode");
const { getLatestSettings } = require("../models/settingsModel");

// Generate QR Code
const QRGenerate = async (req, res) => {
  try {
    const settings = await getLatestSettings();
    if (!settings) {
      return res.status(400).json({
        success: false,
        message:
          "Settings not found. Please configure the settings before generating a QR code.",
      });
    }

    const number = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();
    const generatedDate = new Date();
    const expiryDate = new Date(generatedDate);
    expiryDate.setDate(expiryDate.getDate() + settings.MaxExpiryDays);

    const qrDataURL = await QRCode.toDataURL(number);

    await insertVoucher({
      VoucherCode: number,
      GeneratedDate: generatedDate,
      ExpiryDate: expiryDate,
      Title: settings.Title,
      VoucherWidth: settings.VoucherWidth,
      VoucherHeight: settings.VoucherHeight,
      TitleFontSize: settings.TitleFontSize,
      NormalFontSize: settings.NormalFontSize,
      MaxExpiryDays: settings.MaxExpiryDays,
    });

    res.status(200).json({
      success: true,
      message: "QR Code generated and saved successfully!",
      data: { number, generatedDate, expiryDate, qrCodeImage: qrDataURL },
    });
  } catch (error) {
    console.error("Error generating QR Code:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate QR Code" });
  }
};

// Generate PDF
const generatePDF = async (req, res) => {
  try {
    const voucherCode = req.params.voucherCode;
    const voucher = await getVoucherByCode(voucherCode);
    if (!voucher) {
      return res.status(404).send("Voucher not found.");
    }
    await generateVoucherPDF(voucher, res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};

module.exports = { QRGenerate, generatePDF };
