import { NextApiResponse } from "next";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";
import {
  HelloWorld,
  helloWorlds,
} from "@/pages/data/hello-world/hello-world-data";
import { BadRequestException } from "@/pages/api/utils/exceptions/bad-request.exception";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import axios from "axios";

export class IncidentsController {
  async getAllIncidents(res: NextApiResponse<any>): Promise<void> {
    res.status(HttpStatusCode.OK);
    try {
      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(HttpStatusCode.BAD_REQUEST);
        return res.json(
          new BadRequestException("Pager Duty API Token is required")
        );
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      const response = await axios.get(
        "https://api.pagerduty.com/incidents",
        config
      );
      res.status(HttpStatusCode.OK);
      return res.json(response.data);
    } catch (error: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER);
      return res.json(error);
    }
  }
}
