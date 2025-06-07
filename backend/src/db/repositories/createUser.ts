import { QueryResult } from "pg";
import pool from "..";
import { ApiError } from "../../middlewares/errorHandler";
import { SafeUser } from "../../types";
import { randomUUID } from "crypto";

const createUser = async (
  email: string,
  hashedPassword: string
): Promise<SafeUser> => {
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    return result.rows[0] as SafeUser;
  } catch (err) {
    throw new ApiError("Failed to create the user", 500);
  }
};

export default createUser;
