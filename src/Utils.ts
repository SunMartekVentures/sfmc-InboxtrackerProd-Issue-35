"use strict";

import * as winston from "winston";
import * as shortid from "shortid";

// Configure logging
winston.configure({
  level: process.env.LOG_LEVEL || "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default class Utils {
  /**
   * logInfo: Helper to log Info messages
   *
   */
  public static logInfo(msg: any) {
    winston.info(msg);
  }

  /**
   * logError: Helper to log Error messages
   *
   */
  public static logError(msg: any) {
    winston.error(msg);
  }

  /**
   * prettyPrintJson: helper to pretty print a flat JSON string
   *
   */
  public static prettyPrintJson(jsonString: string) {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  }

  /**
   * initSampleDataAndRenderView: Called to render /apidemo and /appdemo views
   *
   * Helper to init sample JSON data for this session and pass the session to the view
   * This lets the view access session variables (e.g. JWT JSON and sample data) for display purposes.
   *
   */
  public static initSampleDataAndRenderView(
    req: any,
    res: any,
    viewName: string
  ) {
    Utils.logInfo("Request Stringify in Utils " + req);
    if (req.query.classname != undefined) {
      Utils.logInfo("Request get param " + JSON.stringify(req.query.classname));
    }

    if (req.query.code != undefined) {
      Utils.logInfo("Authorization code " + JSON.stringify(req.query.code));
      req.session.authorization_code = req.query.code;
    } else {
      req.session.authorization_code = "";
    }
    Utils.initSampleData()
      .then((sampleData: string) => {
        req.session.sampleJsonData = sampleData;
        res.render(viewName, {
          session: req.session,
          classname: req.query.classname,
          authorization_code: req.query.code,
        });
        //res.send("Success");
      })
      .catch((error: any) => {
        res.send("Failed to load page");
      });
  }

  /**
   * initSampleData: Called on session start to generate sample JSON data to insert into Data Extension
   *
   */
  private static initSampleData(): Promise<string> {
    Utils.logInfo("initSampleData called.");
    return new Promise<string>((resolve, reject) => {
      resolve("Success");
    });
  }
}
