import { QueryResult } from "pg";
import pool from "..";
import { ApiError } from "../../middlewares/errorHandler";
import { User } from "../../types";

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await pool.query(
      "SELECT id, email, password FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as User;
  } catch (err) {
    throw new ApiError("Failed to fetch user", 500);
  }
};

export default getUserById;
