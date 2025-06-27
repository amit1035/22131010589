export const Log = async (
  stack: "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils",
  message: string
) => {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await response.json();
    console.log("Logged:", data.logID); 
  } catch (err) {
    console.error("Logging failed", err);
  }
};
