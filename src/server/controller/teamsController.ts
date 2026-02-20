import { dataService } from '../caching/dataService';

// REVIEW: Structurally identical to trustController/faqController - replace with factory makeController(method)
export default {
  getTeams: async (_, res, next) => {
    // REVIEW: Add explicit Express types: Request, Response, NextFunction
    try {
      const result = await dataService.getTeams();

      if (!result) {
        res.locals.dbResults = 'No Teams controller data';
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
        log: `Error in Teams Controller middleware: ${error instanceof Error ? error.message : 'Unknown error'}`,
        status: 500,
        message: {
          err: 'Failed to correctly retrieve the database query for Teams Controls'
        }
      };
      return next(serverError);
    }
  }
};
