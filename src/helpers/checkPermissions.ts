import { UnAuthorizedError } from "../errors";
import { UserToken } from "./createUserToken";
import { PayloadUser } from "./token";

type UserResource = Pick<UserToken, "_id">;

const checkPermissions = (
  requestUser: PayloadUser,
  resourceUserId: UserResource,
) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthorizedError("Permission denied");
};

export default checkPermissions;
