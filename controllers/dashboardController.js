const { getPaginatedVouchers } = require("../models/voucherModel");

const dashboardPage = async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.redirect("/login"); 
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { totalVouchers, vouchers } = await getPaginatedVouchers(page, limit);
    const totalPages = Math.ceil(totalVouchers / limit);

    res.render("./user/dashboard.ejs", {
      user: req.session.user_id,
      vouchers,
      currentPage: page,
      totalPages,
      limit,
    });
  } catch (error) {
    console.error("Error rendering dashboard page:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  dashboardPage,
};
