import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("Connect DB", () => {
    test("Should handle database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(
            new Error("there was an error connecting to the database")
        );

        const consoleSpy = jest.spyOn(console, "log");
        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                "there was an error connecting to the database"
            )
        );
    });
});
