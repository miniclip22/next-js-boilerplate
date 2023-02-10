import { NextApiResponse } from "next";
import { HttpStatusCode } from "@/pages/api/utils/exceptions/base-error.exception";
import {
  HelloWorld,
  helloWorlds,
} from "@/pages/data/hello-world/hello-world-data";
import { BadRequestException } from "@/pages/api/utils/exceptions/bad-request.exception";
import { NotFoundException } from "@/pages/api/utils/exceptions/not-found.exception";
import axios from "axios";

export class HelloWorldController {
  async getAllHelloWorlds(res: NextApiResponse<any>): Promise<void> {
    res.status(HttpStatusCode.OK);
    return res.send(helloWorlds);
  }

  async createNewHelloWorld(
    name: string,
    res: NextApiResponse<any>
  ): Promise<any> {
    if (!name) {
      res.status(HttpStatusCode.BAD_REQUEST);
      return res.json(new BadRequestException("Name is required"));
    }

    const newHelloWorld: HelloWorld = {
      id: helloWorlds.length + 1,
      name: name,
    };
    helloWorlds.push(newHelloWorld);
    res.status(HttpStatusCode.CREATED);
    return res.json(newHelloWorld);
  }

  async updateHelloWorld(id: number, res: NextApiResponse<any>): Promise<any> {
    const helloWorld = helloWorlds.find(
      (helloWorld: HelloWorld) => helloWorld.id === id
    );
    if (!helloWorld) {
      res.status(HttpStatusCode.NOT_FOUND);
      return res.json(new NotFoundException("Hello World not found"));
    } else {
      helloWorld.name = "Hello World 9999";
      res.status(HttpStatusCode.OK);
      return res.json(helloWorld);
    }
  }

  updateAllHelloWorlds(
    helloWorlds: HelloWorld[],
    res: NextApiResponse<any>
  ): any {
    if (helloWorlds.length === 0) {
      res.status(HttpStatusCode.BAD_REQUEST);
      return res.json(new BadRequestException("Hello World is required"));
    } else {
      helloWorlds.forEach((helloWorld: HelloWorld) => {
        const helloWorldIndex = helloWorlds.findIndex(
          (helloWorld: HelloWorld) => helloWorld.id === helloWorld.id
        );
        helloWorlds[helloWorldIndex] = helloWorld;
      });
      res.status(HttpStatusCode.OK);
      return res.json(helloWorlds);
    }
  }

  async getHelloWorldById(
    id: string | undefined,
    res: NextApiResponse<any>
  ): Promise<any> {
    if (!id) {
      res.status(HttpStatusCode.BAD_REQUEST);
      return res.json(new BadRequestException("Id is required"));
    }

    const helloWorld = helloWorlds.find(
      (helloWorld: HelloWorld) => helloWorld.id === parseInt(id)
    );
    if (!helloWorld) {
      res.status(HttpStatusCode.NOT_FOUND);
      return res.json(new NotFoundException("Hello World not found"));
    } else {
      res.status(HttpStatusCode.OK);
      return res.json(helloWorld);
    }
  }

  async updateHelloWorldById(
    id: string | undefined,
    res: NextApiResponse<any>
  ): Promise<any> {
    if (!id) {
      res.status(HttpStatusCode.BAD_REQUEST);
      return res.json(new BadRequestException("Id is required"));
    }

    const helloWorld = helloWorlds.find(
      (helloWorld: HelloWorld) => helloWorld.id === parseInt(id)
    );
    if (!helloWorld) {
      res.status(HttpStatusCode.NOT_FOUND);
      return res.json(new NotFoundException("Hello World not found"));
    } else {
      helloWorld.name = "Hello World 9999";
      res.status(HttpStatusCode.OK);
      return res.json(helloWorld);
    }
  }

  async deleteHelloWorldById(
    id: string | undefined,
    res: NextApiResponse<any>
  ): Promise<any> {
    if (!id) {
      res.status(HttpStatusCode.BAD_REQUEST);
      return res.json(new BadRequestException("Id is required"));
    }

    const helloWorld = helloWorlds.find(
      (helloWorld: HelloWorld) => helloWorld.id === parseInt(id)
    );
    if (!helloWorld) {
      res.status(HttpStatusCode.NOT_FOUND);
      return res.json(new NotFoundException("Hello World not found"));
    } else {
      const helloWorldIndex = helloWorlds.findIndex(
        (helloWorld: HelloWorld) => helloWorld.id === parseInt(id)
      );
      helloWorlds.splice(helloWorldIndex, 1);
      res.status(HttpStatusCode.OK);
      return res.json(helloWorld);
    }
  }

  async getAllHelloWorldsWithAxios(res: NextApiResponse<any>): Promise<any> {
    try {
      res.status(200);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.get("https://dummyjson.com/products/", {
        headers,
      });
      const data = response.data;
      res.status(200);
      return res.json(data);
    } catch (error: any) {
      console.error(error);
      res.status(HttpStatusCode.OK);
      res.status(500);
      return res.json({ statusCode: 500, message: error.message });
    }
  }
}
