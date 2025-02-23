import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const electionData = {
  presidential: [
    {
      name: "Kamala Harris",
      party: "Democratic",
      stance: "Harris pledged to restore federal protections for abortion access, aiming to codify the rights previously guaranteed under Roe v. Wade. She emphasized safeguarding women's health and autonomy in reproductive decisions."
    },
    {
      name: "Donald Trump",
      party: "Republican", 
      stance: "Trump took credit for the Supreme Court's decision to overturn Roe v. Wade and suggested that abortion regulations should be determined by individual states. He criticized total abortion bans without exceptions and proposed that red states could monitor pregnancies and prosecute abortions."
    }
  ],
  senate: [
    {
      name: "Kirsten Gillibrand",
      party: "Democratic",
      stance: "Gillibrand is a staunch advocate for reproductive rights, consistently supporting legislation to protect and expand access to abortion services."
    },
    {
      name: "Joe Pinion",
      party: "Republican",
      stance: "Pinion has expressed support for restrictions on abortion, aligning with pro-life positions, though specific details from the 2024 campaign are limited."
    }
  ],
  governor: [
    {
      name: "Kathy Hochul",
      party: "Democratic",
      stance: "Hochul has actively worked to enshrine abortion rights into state law, ensuring New York remains a sanctuary for reproductive healthcare."
    },
    {
      name: "Lee Zeldin",
      party: "Republican",
      stance: "Zeldin, identifying as pro-life, has supported measures to restrict abortion but indicated he would uphold New York's existing abortion laws if elected."
    }
  ],
  mayor: [
    {
      name: "Eric Adams",
      party: "Democratic",
      stance: "Adams has reaffirmed his commitment to maintaining and expanding access to abortion services within the city, positioning New York City as a leader in reproductive rights."
    },
    {
      name: "Curtis Sliwa",
      party: "Republican",
      stance: "Sliwa, while personally pro-life, stated he would not interfere with New York City's pro-choice policies and would respect the state's legal framework on abortion."
    }
  ]
};