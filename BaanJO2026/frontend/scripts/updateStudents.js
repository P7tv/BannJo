import fs from "fs";

const sheetId = "1kR9--vSmaaVJWDBIVcoUgwCGc7h_J7XZYWzX3reQSDM";

const sheetNames = [
  "วินขวัญ",
  "ต้าเต้ย",
  "ไผ่สไปรท์",
  "พละส้มส้ม",
  "นนขนมปัง",
];

const groupMap = {
  "วข": "WQN",
  "ตต": "TTE",
  "ผส": "PSP",
  "พสส": "PLS",
  "นข": "NNP",
};

const hormoneMap = {
  "T": "testosterone",
  "E": "estrogen",
  "D": "dopamine",
  "A": "adrenaline",
  "C": "cortisol",
  "O": "oxytocin",
};

const splitCode = (code) => {
  const match = code.match(/^([^\dA-Z]+)([A-Z])(\d+)$/);
  if (!match) return null;

  const [, group, subGroup, number] = match;
  return [group, subGroup, number];
};

const updateStudents = async () => {
  const studentMap = {};

  try {
    for (const sheetName of sheetNames) {
      const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
      const response = await fetch(sheetUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      const json = JSON.parse(text.substring(47).slice(0, -2)); // Strip Google JSONP

      const rows = json.table.rows
        .map((row) => row.c.map((cell) => cell?.v).filter((cell) => cell !== undefined))
        .filter((row) => row.length > 0); // Skip empty rows

      for (const row of rows) {
        const code = row[0];
        const parts = splitCode(code);
        if (!parts) continue;

        const [groupCode, subGroup, number] = parts;

        // Helper to ensure phone numbers start with '0'
        const ensureLeadingZero = (num) => {
          if (!num) return "";
          num = String(num);
          return num.startsWith("0") ? num : "0" + num;
        };

        const studentData = {
          code: code,
          titleName: row[1],
          firstName: row[2],
          lastName: row[3],
          nickname: row[4],
          group: groupMap[groupCode],
          hormone: hormoneMap[subGroup],
          faculty: row[5],
          tel: ensureLeadingZero(row[6]),
          foodAllergy: row[7],
          drugAllergy: row[8],
          illness: row[9],
          emergencyContact: ensureLeadingZero(row[10]),
          emergencyStatus: row[11],
          isCollectBottle: row[12] === "รับ",
        };

        // Use phone number as key
        studentMap[studentData.tel] = studentData;
      }
    }

    // Write to file
    fs.writeFileSync("constants/students.json", JSON.stringify(studentMap, null, 2), "utf-8");
    console.log("✅ students.json has been written successfully.");
  } catch (error) {
    console.error("❌ Failed to update students:", error);
  }
};

updateStudents();
