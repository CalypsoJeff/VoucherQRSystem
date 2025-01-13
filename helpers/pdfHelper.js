const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

// Generate PDF
const generateVoucherPDF = async (voucher, res) => {
  try {
    const qrCodeBuffer = await QRCode.toBuffer(voucher.VoucherCode);
    const voucherWidth = voucher.VoucherWidth * 2.83465;
    const voucherHeight = voucher.VoucherHeight * 2.83465;
    const doc = new PDFDocument({
      size: [voucherWidth, voucherHeight],
      margin: 0,
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${voucher.VoucherCode}.pdf"`
    );
    doc.rect(10, 10, voucherWidth - 20, voucherHeight - 20).stroke("#333");

    // Title
    doc
      .font("Helvetica-Bold")
      .fontSize(voucher.TitleFontSize)
      .text(voucher.Title || "Company Name", voucherWidth / 2, 60, {
        align: "center",
      });

    // Subtitle
    doc
      .font("Helvetica")
      .fontSize(voucher.NormalFontSize + 4)
      .text("GIFT VOUCHER", voucherWidth / 2, 90, {
        align: "center",
      });

    // QR Code Section
    const qrSize = Math.min(voucherWidth, voucherHeight) * 0.35;
    const qrX = (voucherWidth - qrSize) / 2;
    const qrY = 150;
    doc.image(qrCodeBuffer, qrX, qrY, {
      fit: [qrSize, qrSize],
      align: "center",
      valign: "center",
    });

    // Voucher Details
    const detailsY = qrY + qrSize + 50;
    doc
      .font("Helvetica")
      .fontSize(voucher.NormalFontSize)
      .text(`Voucher #: ${voucher.VoucherCode}`, voucherWidth / 2, detailsY, {
        align: "center",
      });
    doc.text(
      `Generated: ${new Date(voucher.GeneratedDate).toLocaleDateString()}`,
      voucherWidth / 2,
      detailsY + 30,
      { align: "center" }
    );
    doc.text(
      `Expires: ${new Date(voucher.ExpiryDate).toLocaleDateString()}`,
      voucherWidth / 2,
      detailsY + 60,
      { align: "center" }
    );

    // Footer
    doc
      .font("Helvetica-Oblique")
      .fontSize(voucher.NormalFontSize - 2)
      .text(
        "Terms and conditions apply",
        voucherWidth / 2,
        voucherHeight - 50,
        {
          align: "center",
        }
      )
      .text(
        "Valid at all our locations",
        voucherWidth / 2,
        voucherHeight - 30,
        {
          align: "center",
        }
      );

    // Stream PDF to the response
    doc.pipe(res);
    doc.end();
  } catch (error) {
    throw new Error(`Error generating PDF: ${error.message}`);
  }
};

module.exports = { generateVoucherPDF };
