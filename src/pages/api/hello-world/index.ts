// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HelloWorldController } from "@/pages/api/controller/hello-world";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import { HelloWorld } from "@/pages/data/hello-world/hello-world-data";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";

const helloWorldController = new HelloWorldController();

const router = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      // return helloWorldController.getAllHelloWorlds(res);
      return helloWorldController.getAllHelloWorldsWithAxios(res);
    }
    case "POST": {
      const {
        body: { name },
      } = req;

      const [postName] = Array.isArray(name) ? name : [name];
      return helloWorldController.createNewHelloWorld(postName, res);
    }
    case "PUT": {
      const helloWorlds: Array<HelloWorld> = req.body.helloWorlds;

      return helloWorldController.updateAllHelloWorlds(helloWorlds, res);
    }

    default:
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(new NotFoundException("No Request Methods Defined"));
  }
};

export default router;
