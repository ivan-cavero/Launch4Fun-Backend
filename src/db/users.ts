import { getClient } from "."

export const loginUser = async (username: string) => {
	const client = getClient("users")

	const result = await client.execute({
		sql: "SELECT * FROM users WHERE username = ? AND deleted IS NULL",
		args: [username]
	})

	if (result.rows.length === 0) {
		return null
	}

	const user = result.rows[0]

	return user
}

export const createUser = async (username: string, password: string, email: string) => {
    const client = getClient("users");
    
    const hashedPassword = await Bun.password.hash(password);
	const dateCreated = new Date().toISOString();

    const result = await client.execute({
        sql: "INSERT INTO users (username, password, email, date_created, deleted) VALUES (?, ?, ?, ?, NULL)",
        args: [username, hashedPassword, email, dateCreated]
    });

    if (result.rowsAffected === 1) {
        return await loginUser(username)
    }

    return null;
};

export const findUserByEmail = async (email: string) => {
    const client = getClient("users");

    const result = await client.execute({
        sql: "SELECT * FROM users WHERE email = ? AND deleted IS NULL",
        args: [email]
    });

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};
