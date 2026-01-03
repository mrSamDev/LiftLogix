import { Hono } from "hono";
import createMetric from "./create";
import getMetrics from "./get";
import getLatestMetric from "./getLatest";
import deleteMetric from "./delete";

const metrics = new Hono();

metrics.route("/metrics", createMetric);
metrics.route("/metrics", getMetrics);
metrics.route("/metrics", getLatestMetric);
metrics.route("/metrics", deleteMetric);

export default metrics;
