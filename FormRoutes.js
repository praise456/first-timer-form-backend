const express = require("express");
const FirstTimer = require("../models/FirstTimer");
const ExcelJS = require("exceljs");

const router = express.Router();

// Route to handle form submission
router.post("/submit", async (req, res) => {
  try {
    const newEntry = new FirstTimer(req.body);
    await newEntry.save();
    res.status(201).send("Form data saved successfully.");
  } catch (error) {
    res.status(500).send("Error saving form data: " + error);
  }
});

// Route to download data as Excel
router.get("/download", async (req, res) => {
  try {
    const data = await FirstTimer.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("First Timer's Data");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Occupation", key: "occupation", width: 20 },
      { header: "Contact Address", key: "contactAddress", width: 25 },
      { header: "Telephone", key: "telephone", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Born Again?", key: "bornAgain", width: 15 },
      { header: "How You Heard", key: "hearAboutChurch", width: 20 },
      { header: "Others", key: "others", width: 15 },
      { header: "Age", key: "age", width: 10 },
      { header: "Remarks", key: "remarks", width: 25 },
    ];

    data.forEach((entry) => {
      worksheet.addRow(entry);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=formData.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).send("Error generating Excel file: " + error);
  }
});

module.exports = router;
