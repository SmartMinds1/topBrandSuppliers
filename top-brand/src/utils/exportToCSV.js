/**
 * Reusable CSV Export Utility
 *
 * @param {Array<Object>} data - Array of objects to export
 * @param {Object} options
 * @param {string} options.filename - File name (default: export.csv)
 * @param {Array<{ key: string, label: string }>} options.columns
 */
const exportToCSV = (
  data,
  {
    filename = "export.csv",
    columns = null, // optional column mapping
  } = {}
) => {
  if (!Array.isArray(data) || data.length === 0) return;

  // Use column config if provided, otherwise infer from data
  const headers = columns
    ? columns.map((col) => col.label)
    : Object.keys(data[0]);

  const keys = columns ? columns.map((col) => col.key) : Object.keys(data[0]);

  const csvRows = [
    headers.join(","), // Header row
    ...data.map((row) => keys.map((key) => `"${row[key] ?? ""}"`).join(",")),
  ];

  // UTF-8 BOM for LibreOffice & Excel
  const csvContent = "\uFEFF" + csvRows.join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export default exportToCSV;
