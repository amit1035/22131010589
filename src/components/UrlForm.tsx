import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import { Log } from "../utils/logger";

interface UrlEntry {
  originalUrl: string;
  validity?: number;
  shortcode?: string;
}

interface UrlResult extends UrlEntry {
  shortUrl: string;
  expiry: string;
}

const generateRandomCode = (length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getStoredMappings = () => {
  const data = localStorage.getItem("urlMappings");
  return data ? JSON.parse(data) : {};
};

const saveMapping = (shortcode: string, mapping: any) => {
  const current = getStoredMappings();
  current[shortcode] = mapping;
  localStorage.setItem("urlMappings", JSON.stringify(current));
};

const UrlForm = () => {
  const [entries, setEntries] = useState<UrlEntry[]>([{ originalUrl: "" }]);
  const [results, setResults] = useState<UrlResult[]>([]);
  const [message, setMessage] = useState("");

  const handleChange = (
    index: number,
    field: keyof UrlEntry,
    value: string
  ) => {
    const updated = [...entries];
    if (field === "validity") {
      updated[index][field] = parseInt(value) || undefined;
    } else {
      updated[index][field] = value;
    }
    setEntries(updated);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isUniqueShortcode = (code: string): boolean => {
    const mappings = getStoredMappings();
    return !mappings[code];
  };

  const handleSubmit = async () => {
    for (let entry of entries) {
      if (!isValidUrl(entry.originalUrl)) {
        setMessage("Invalid URL found. Please check again.");
        await Log("frontend", "error", "component", "Invalid URL submitted");
        return;
      }
    }

    try {
      const newResults: UrlResult[] = [];

      for (const entry of entries) {
        let code = entry.shortcode?.trim() || generateRandomCode();

        // Ensure uniqueness
        while (!isUniqueShortcode(code)) {
          code = generateRandomCode();
        }

        const validity = entry.validity || 30; // Default to 30 mins
        const expiryDate = new Date(Date.now() + validity * 60000).toISOString();

        const mapping = {
          originalUrl: entry.originalUrl,
          expiry: expiryDate,
          createdAt: new Date().toISOString(),
          clicks: [],
        };

        saveMapping(code, mapping);

        const result: UrlResult = {
          ...entry,
          shortUrl: `http://localhost:3000/${code}`,
          expiry: expiryDate,
        };

        newResults.push(result);

        await Log("frontend", "info", "component", `Shortened: ${entry.originalUrl} → ${code}`);
      }

      setResults(newResults);
      setEntries([{ originalUrl: "" }]);
    } catch (error: any) {
      setMessage("Something went wrong while shortening URLs.");
      await Log("frontend", "fatal", "component", error.message || "Unknown error");
    }
  };

  const addMore = () => {
    if (entries.length < 5) {
      setEntries([...entries, { originalUrl: "" }]);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      {entries.map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Original URL"
              fullWidth
              value={entry.originalUrl}
              onChange={(e) => handleChange(index, "originalUrl", e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Validity (mins)"
              type="number"
              fullWidth
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button onClick={addMore} variant="outlined" disabled={entries.length >= 5}>
        Add More
      </Button>

      <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>
        Shorten URLs
      </Button>

      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={() => setMessage("")}
        message={message}
      />

      {/* Display Results */}
      {results.length > 0 && (
        <Paper sx={{ mt: 4, p: 2, backgroundColor: "#f7f7f7" }}>
          <Typography variant="h6">Shortened Results</Typography>
          {results.map((res, idx) => (
            <Typography key={idx}>
              <strong>Original:</strong> {res.originalUrl} <br />
              <strong>Short:</strong>{" "}
              <a href={res.shortUrl} target="_blank" rel="noreferrer">
                {res.shortUrl}
              </a>{" "}
              | Expires at: {res.expiry}
              <br />
              <br />
            </Typography>
          ))}
        </Paper>
      )}
    </Paper>
  );
};

export default UrlForm;
