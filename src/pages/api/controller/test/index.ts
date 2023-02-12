import { NextApiResponse } from "next";
import axios from "axios";

export class TestsController {
  async getAllUsers(res: NextApiResponse<any>): Promise<void> {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
      },
    };

    if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
      res.status(400);
      return res.json("Bad request: No page duty API token");
    }

    try {
      const response = await axios.get(
        "https://api.pagerduty.com/users",
        config
      );
      res.status(200);

      return res.json(response.data);
    } catch (error: any) {
      res.status(500);
      res.json({ statusCode: 500, error: `an error happened: ${error}` });
    }
  }

  async getAllContactMthodsOfUsers(res: NextApiResponse<any>): Promise<void> {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
      },
    };

    if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
      res.status(400);
      return res.json("Bad request: No page duty API token");
    }

    try {
      const response = await axios.get(
        "https://api.pagerduty.com/users",
        config
      );

      const userInformation = response.data.users.map((user: any) => {
        console.log(user);

        return {
          name: user.name,
          email: user.email,
          contact_methods: user.contact_methods,
        };
      });

      res.status(200);
      res.json(userInformation);
    } catch (error: any) {
      res.status(500);
      res.json({ statusCode: 500, error: `an error happened: ${error}` });
    }
  }

  // async getAllUsers(res: NextApiResponse<any>): Promise<void> {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
  //     },
  //   };
  //
  //   if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
  //     res.status(500);
  //     return res.json("No PagerDuty API Token");
  //   }
  //
  //   try {
  //     const response = await axios.get(
  //       "https://api.pagerduty.com/users",
  //       config
  //     );
  //     res.status(200);
  //     return res.json(response.data);
  //   } catch (error: any) {
  //     res.status(500);
  //     return res.json(error);
  //   }
  // }

  async getAllUsersByName(
    id: string | undefined,
    res: NextApiResponse<any>
  ): Promise<void> {
    if (!id) {
      res.status(500);
      return res.json("No ID Provided");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(500);
        return res.json("No PagerDuty API Token");
      }

      try {
        const response = await axios.get(
          `https://api.pagerduty.com/users/${id}`,
          config
        );
        res.status(200);
        return res.json(response.data);
      } catch (error: any) {
        res.status(500);
        return res.json(error);
      }
    }
  }

  async getUserContactInfoByName(
    userName: string | undefined,
    res: NextApiResponse<any>
  ): Promise<void> {
    if (!userName) {
      res.status(500);
      return res.json("No Name Provided");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(500);
        return res.json("No PagerDuty API Token");
      }

      try {
        const response = await axios.get(
          `https://api.pagerduty.com/users?query=${userName}`,
          config
        );

        const users = response.data.users;
        const user = users[0];
        const contactMethods = user.contact_methods;

        res.status(200);
        return res.json(contactMethods);
      } catch (error: any) {
        res.status(500);
        return res.json(error);
      }
    }
  }

  async createUser(
    userToCreate: any,
    res: NextApiResponse<any>
  ): Promise<void> {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        from: "125.greenholt.earline@graham.name",
      },
    };

    if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
      res.status(500);
      return res.json("No PagerDuty API Token");
    }

    // TODO: define the user object interface

    // const user = {
    //   type: "user",
    //   name: "Earline Greenholt",
    //   email: "125.greenholt.earline@graham.name",
    //   time_zone: "America/Lima",
    //   color: "green",
    //   role: "admin",
    //   job_title: "Director of Engineering",
    //   avatar_url:
    //     "https://secure.gravatar.com/avatar/1d1a39d4635208d5664082a6c654a73f.png?d=mm&r=PG",
    //   description: "I'm the boss",
    //   license: {
    //     id: "PTDVERC",
    //     type: "license_reference",
    //   },
    // };

    try {
      await axios.post("https://api.pagerduty.com/users", userToCreate, config);
      res.status(201);
      return res.json("User Created");
    } catch (error: any) {
      res.status(500);
      return res.json(error.message);
    }
  }

  async deleteUser(
    userId: string | undefined,
    res: NextApiResponse<any>
  ): Promise<void> {
    if (userId === undefined) {
      res.status(400);
      return res.json("No User Id Provided");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(401);
        return res.json("No PagerDuty API Token");
      }

      try {
        await axios.delete(`https://api.pagerduty.com/users/${userId}`, config);
        res.status(204);
        return res.json("User Deleted");
      } catch (error: any) {
        res.status(500);
        return res.json(error.message);
      }
    }
  }

  async updateUser(
    userId: string | undefined,
    newUser: any,
    res: NextApiResponse<any>
  ): Promise<void> {
    if (userId === undefined) {
      res.status(400);
      return res.json("No User Id Provided");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(401);
        return res.json("No PagerDuty API Token");
      }

      if (!newUser) {
        res.status(400);
        return res.json("No new user Provided");
      } else {
        try {
          await axios.put(
            `https://api.pagerduty.com/users/${userId}`,
            newUser,
            config
          );
          res.status(201);
          return res.json("User Updated");
        } catch (error: any) {
          res.status(500);
          return res.json(error.message);
        }
      }
    }
  }

  async getAuditRecordsByUserId(
    userId: string | undefined,
    res: NextApiResponse<any>
  ) {
    if (userId === undefined) {
      res.status(400);
      return res.json("No User Id Provided");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${process.env.PAGER_DUTY_TEST_API_TOKEN} `,
        },
      };

      if (!process.env.PAGER_DUTY_TEST_API_TOKEN) {
        res.status(401);
        return res.json("No PagerDuty API Token");
      }

      try {
        const response = await axios.get(
          `https://api.pagerduty.com/users/${userId}/audit/records`,
          config
        );
        res.status(200);
        return res.json(response.data);
      } catch (error: any) {
        res.status(500);
        return res.json(error.message);
      }
    }
  }
}
