import { dataService } from '../caching/dataService';

// REVIEW: Structurally identical to faqController/teamsController - replace with factory makeController(method)
export default {
  getTrustControls: async (_, res, next) => {
    // REVIEW: Add explicit Express types: Request, Response, NextFunction
    try {
      const result = await dataService.getControls();

      if (!result) {
        res.locals.dbResults = 'No Trust controller data';
        return next();
      }

      res.locals.dbResults = result.data;
      res.locals.cacheInfo = {
        source: result.source,
        cached: result.source === 'cache'
      };

      return next();
    } catch (error) {
      const serverError = {
        log: `Error in Trust Controls Controller middleware: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: 500,
        message: {
          err: 'Failed to correctly retrieve the database query for Trust Controls'
        }
      };
      return next(serverError);
    }
  }
};
