import type { NextApiRequest, NextApiResponse } from "next";
import { HelloWorldController } from "@/pages/api/controller/hello-world";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import { HelloWorld } from "@/pages/data/hello-world/hello-world-data";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";
import { UsersController } from "@/pages/api/controller/users";
import { IncidentsController } from "@/pages/api/controller/incidents";

const incidentsController = new IncidentsController();

const router = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      // return helloWorldController.getAllHelloWorlds(res);
      return incidentsController.getAllIncidents(res);
    }

    default:
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(new NotFoundException("No Request Methods Defined"));
  }
};

export default router;
