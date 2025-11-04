import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { highScores } from '../shared/schema.js';
import { desc } from 'drizzle-orm';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/highscores', async (req, res) => {
  try {
    const scores = await db
      .select({
        id: highScores.id,
        initials: highScores.initials,
        score: highScores.score,
        createdAt: highScores.createdAt
      })
      .from(highScores)
      .orderBy(desc(highScores.score))
      .limit(10);
    
    res.json(scores);
  } catch (error) {
    console.error('Error fetching high scores:', error);
    res.status(500).json({ error: 'Failed to fetch high scores' });
  }
});

app.post('/api/highscores', async (req, res) => {
  try {
    const { initials, score, email } = req.body;
    
    if (!initials || initials.length !== 3) {
      return res.status(400).json({ error: 'Initials must be exactly 3 characters' });
    }
    
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Invalid score' });
    }
    
    const [newScore] = await db
      .insert(highScores)
      .values({
        initials: initials.toUpperCase(),
        score,
        email: email || null
      })
      .returning({
        id: highScores.id,
        initials: highScores.initials,
        score: highScores.score,
        createdAt: highScores.createdAt
      });
    
    res.json(newScore);
  } catch (error) {
    console.error('Error creating high score:', error);
    res.status(500).json({ error: 'Failed to create high score' });
  }
});

app.get('/api/check-highscore/:score', async (req, res) => {
  try {
    const score = parseInt(req.params.score);
    
    const topScores = await db
      .select({ score: highScores.score })
      .from(highScores)
      .orderBy(desc(highScores.score))
      .limit(10);
    
    const isTopTen = topScores.length < 10 || score > topScores[topScores.length - 1].score;
    
    res.json({ isTopTen });
  } catch (error) {
    console.error('Error checking high score:', error);
    res.status(500).json({ error: 'Failed to check high score' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
