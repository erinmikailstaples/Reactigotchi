import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const highScores = pgTable('high_scores', {
  id: serial('id').primaryKey(),
  initials: varchar('initials', { length: 3 }).notNull(),
  score: integer('score').notNull(),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
