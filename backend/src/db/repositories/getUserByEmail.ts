import { QueryResult } from "pg";
import pool from "..";
import { ApiError } from "../../middlewares/errorHandler";
import { User } from "../../types";

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as User;
  } catch (err) {
    throw new ApiError("Failed to fetch user", 500);
  }
};

export default getUserByEmail;
