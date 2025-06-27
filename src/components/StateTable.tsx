import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Log } from "../utils/logger";

interface ClickData {
  time: string;
  location: string;
  source: string;
}

interface StatEntry {
  shortUrl: string;
  createdAt: string;
  expiry: string;
  clicks: number;
  clickDetails: ClickData[];
}

const StatsTable = () => {
  const [data, setData] = useState<StatEntry[]>([]);

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem("stats") || "[]");
    setData(stats);
    Log("frontend", "info", "component", "Loaded stats page data");
  }, []);

  return (
    <Paper sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      {data.length === 0 ? (
        <Typography>No data found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Click Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry, i) => (
              <TableRow key={i}>
                <TableCell>
                  <a href={entry.shortUrl} target="_blank" rel="noreferrer">
                    {entry.shortUrl}
                  </a>
                </TableCell>
                <TableCell>{entry.createdAt}</TableCell>
                <TableCell>{entry.expiry}</TableCell>
                <TableCell>{entry.clicks}</TableCell>
                <TableCell>
                  {entry.clickDetails.map((click, j) => (
                    <div key={j}>
                      🕒 {click.time}, 🌍 {click.location}, 🔗 {click.source}
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default StatsTable;
