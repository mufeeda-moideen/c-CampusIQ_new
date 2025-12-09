const pool = require("../db");

// ✅ GET ALL RESOURCES
exports.getResources = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resources ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET RESOURCES ERROR:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

// ✅ CREATE RESOURCE (FIXED FOR YOUR FORM)
exports.createResource = async (req, res) => {
  try {
    const r = req.body;

    const result = await pool.query(
      `INSERT INTO resources 
      (title, category, type, file_url, downloads, views, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [
        r.title,
        r.category,
        r.type,
        r.fileUrl,     // ✅ frontend uses fileUrl
        r.metrics || 0, // ✅ map metrics → downloads
        0,             // ✅ views default 0
        r.status
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE RESOURCE ERROR:", err);
    res.status(500).json({ error: "Failed to create resource" });
  }
};

// ✅ UPDATE RESOURCE (FIXED)
exports.updateResource = async (req, res) => {
  try {
    const r = req.body;

    const result = await pool.query(
      `UPDATE resources 
       SET title=$1, category=$2, type=$3, file_url=$4, downloads=$5, status=$6 
       WHERE id=$7 RETURNING *`,
      [
        r.title,
        r.category,
        r.type,
        r.fileUrl,       // ✅ correct mapping
        r.metrics || 0,  // ✅ map metrics → downloads
        r.status,
        req.params.id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE RESOURCE ERROR:", err);
    res.status(500).json({ error: "Failed to update resource" });
  }
};

// ✅ DELETE RESOURCE (ALREADY PERFECT)
exports.deleteResource = async (req, res) => {
  try {
    await pool.query("DELETE FROM resources WHERE id=$1", [req.params.id]);
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("DELETE RESOURCE ERROR:", err);
    res.status(500).json({ error: "Failed to delete resource" });
  }
};
