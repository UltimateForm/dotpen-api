import { ManagedTransaction } from "neo4j-driver";
import { UserEntity } from "../models/data";
import { UserExistsOperator } from "../models/operators";

export function computeUserExistsAtomically(user: UserEntity) {
  return (tx: ManagedTransaction) => {
    return tx.run<UserExistsOperator>(
      `MATCH (u:User {email:$email, password:$password})
			RETURN count(u) > 0 as exists`,
      { email: user.email, password: user.password },
    );
  };
}
