import type { NextApiRequest, NextApiResponse } from "next";
import { HelloWorldController } from "@/pages/api/controller/hello-world";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import { HelloWorld } from "@/pages/data/hello-world/hello-world-data";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";
import { UsersController } from "@/pages/api/controller/users";

const usersController = new UsersController();

const router = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const [idTemp] = Array.isArray(id) ? id : [id];
      return usersController.getAuditRecordsByUserId(idTemp, res);
    }
    case "PUT": {
    }

    default:
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send(new NotFoundException("No Request Methods Defined"));
  }
};

export default router;
