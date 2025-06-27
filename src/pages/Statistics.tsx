// src/pages/Statistics.tsx
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Log } from "../utils/logger";

interface Click {
  timestamp: string;
  source: string;
  location: string;
}

interface UrlStats {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiry: string;
  clickCount: number;
  clicks: Click[];
}

const Statistics = () => {
  const [data, setData] = useState<UrlStats[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/statistics");
        const stats = await res.json();

        if (!res.ok) {
          await Log("frontend", "error", "page", "Failed to load statistics");
          return;
        }

        setData(stats);
        await Log("frontend", "info", "page", "Statistics loaded");
      } catch (err: any) {
        await Log("frontend", "fatal", "page", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        URL Statistics
      </Typography>
      {data.map((url, idx) => (
        <Paper key={idx} sx={{ p: 2, my: 2, backgroundColor: "#f5f5f5" }}>
          <Typography><strong>Original:</strong> {url.originalUrl}</Typography>
          <Typography><strong>Short URL:</strong> http://localhost:3000/{url.shortcode}</Typography>
          <Typography><strong>Created:</strong> {url.createdAt}</Typography>
          <Typography><strong>Expires:</strong> {url.expiry}</Typography>
          <Typography><strong>Clicks:</strong> {url.clickCount}</Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {url.clicks.map((click, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`Time: ${click.timestamp}`}
                  secondary={`Source: ${click.source} | Location: ${click.location}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Paper>
  );
};

export default Statistics;
