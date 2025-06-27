import { useEffect, useState } from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Log } from "../utils/logger";

interface ClickData {
  timestamp: string;
  source: string;
  location: string;
}

interface ShortUrlData {
  shortUrl: string;
  createdAt: string;
  expiry: string;
  clickCount: number;
  clicks: ClickData[];
}

const Statistics = () => {
  const [urls, setUrls] = useState<ShortUrlData[]>([]);

  useEffect(() => {
    // Replace with actual fetch if backend supports, else simulate
    const sampleData: ShortUrlData[] = [
      {
        shortUrl: "http://localhost:3000/abcd1",
        createdAt: "2025-06-27T14:00",
        expiry: "2025-06-27T14:30",
        clickCount: 3,
        clicks: [
          { timestamp: "2025-06-27T14:05", source: "Chrome", location: "India" },
          { timestamp: "2025-06-27T14:10", source: "Firefox", location: "Germany" },
          { timestamp: "2025-06-27T14:20", source: "Safari", location: "USA" },
        ],
      },
    ];
    setUrls(sampleData);
    Log("frontend", "info", "page", "Statistics loaded");
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      {urls.map((url, i) => (
        <Paper sx={{ p: 2, mt: 2 }} key={i}>
          <Typography><strong>Short URL:</strong> <a href={url.shortUrl}>{url.shortUrl}</a></Typography>
          <Typography><strong>Created:</strong> {url.createdAt}</Typography>
          <Typography><strong>Expires:</strong> {url.expiry}</Typography>
          <Typography><strong>Total Clicks:</strong> {url.clickCount}</Typography>

          <Table size="small" sx={{ mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {url.clicks.map((click, j) => (
                <TableRow key={j}>
                  <TableCell>{click.timestamp}</TableCell>
                  <TableCell>{click.source}</TableCell>
                  <TableCell>{click.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Paper>
  );
};

export default Statistics;
