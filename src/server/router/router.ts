import express from "express";
import faqController from "../controller/faqController";
import trustController from "../controller/trustController";
import teamsController from "../controller/teamsController";
import { getCacheStats } from "../caching/cache";
import { dataService } from "../caching/dataService";

const router = express.Router();

// This endpoint is used for postman testing 
// router.get("/test", (_, res) => {
//   return res.status(200).send("Endpoint Test");
// });

router.get("/trustControls", trustController.getTrustControls, (_, res) => {
  const controlsData = res.locals.dbResults;
  const cacheInfo = res.locals.cacheInfo || {
    source: "unknown",
    cached: false,
  };

  return res.json({
    source: cacheInfo.source,
    data: controlsData,
    cached: cacheInfo.cached,
    timestamp: new Date().toISOString(),
  });
});

router.get("/allTeams", teamsController.getTeams, (_, res) => {
  const teamsData = res.locals.dbResults;
  const cacheInfo = res.locals.cacheInfo || {
    source: "unknown",
    cached: false,
  };

  return res.json({
    source: cacheInfo.source,
    data: teamsData,
    cached: cacheInfo.cached,
    timestamp: new Date().toISOString(),
  });
});

router.get("/trustFaqs", faqController.getTrustFaqs, (_, res) => {
  const faqsData = res.locals.dbResults;
  const cacheInfo = res.locals.cacheInfo || {
    source: "unknown",
    cached: false,
  };

  return res.json({
    source: cacheInfo.source,
    data: faqsData,
    cached: cacheInfo.cached,
    timestamp: new Date().toISOString(),
  });
});

router.post("/admin/clear-cache", (req, res) => {
  const { type } = req.body;

  dataService.clearCache(type);
  const statsReset = getCacheStats();

  res.json({
    success: true,
    message: type ? `Cache cleared for ${type}` : "All cache cleared",
    timestamp: new Date().toISOString(),
    hits: statsReset.hits,
    misses: statsReset.misses,
    keys: statsReset.keys,
    ksize: statsReset.ksize,
    vsize: statsReset.vsize,
  });
});

// Note: This route is still buggy (only fix if have time)
router.get("/admin/cache-stats", (_, res) => {
  const stats = getCacheStats();
  res.json({
    hits: stats.hits,
    misses: stats.misses,
    keys: stats.keys,
    ksize: stats.ksize,
    vsize: stats.vsize,
  });
});

export default router;
