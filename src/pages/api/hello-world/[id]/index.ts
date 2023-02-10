// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";
import { HelloWorldController } from "../../controller/hello-world";

const helloWorldController = new HelloWorldController();
const router = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;

      const [idTemp] = Array.isArray(id) ? id : [id];

      return helloWorldController.getHelloWorldById(idTemp, res);
    }
    case "PUT": {
      const {
        body: { id },
      } = req;

      return helloWorldController.updateHelloWorldById(id, res);
    }
    case "DELETE": {
      const { id } = req.query;
      const [idTemp] = Array.isArray(id) ? id : [id];
      return helloWorldController.deleteHelloWorldById(idTemp, res);
    }
    default:
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(new NotFoundException("No Request Methods Defined"));
  }
};

export default router;
