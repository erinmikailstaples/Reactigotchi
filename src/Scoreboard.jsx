import { useState, useEffect } from 'react';
import './Scoreboard.css';

export default function Scoreboard({ onClose, finalScore }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [initials, setInitials] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadScores();
    if (finalScore !== undefined) {
      checkIfHighScore();
    }
  }, [finalScore]);

  const loadScores = async () => {
    try {
      const response = await fetch('/api/highscores');
      const data = await response.json();
      setScores(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading scores:', error);
      setLoading(false);
    }
  };

  const checkIfHighScore = async () => {
    try {
      const response = await fetch(`/api/check-highscore/${finalScore}`);
      const data = await response.json();
      setShowSubmit(data.isTopTen);
    } catch (error) {
      console.error('Error checking high score:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initials.length !== 3) return;

    setSubmitting(true);
    try {
      await fetch('/api/highscores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initials: initials.toUpperCase(),
          score: finalScore,
          email: email || null
        })
      });
      
      await loadScores();
      setShowSubmit(false);
      setInitials('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="scoreboard-overlay">
      <div className="scoreboard">
        <h2 className="scoreboard-title">🏆 Top 10 Scores 🏆</h2>
        
        {showSubmit && (
          <div className="score-submit">
            <p className="congrats">You made the Top 10!</p>
            <p className="your-score">Your Score: {finalScore}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ABC"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                className="initials-input"
                required
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
              <button type="submit" disabled={submitting || initials.length !== 3}>
                {submitting ? 'Saving...' : 'Submit'}
              </button>
            </form>
          </div>
        )}

        <div className="scores-list">
          {loading ? (
            <p>Loading...</p>
          ) : scores.length === 0 ? (
            <p>No scores yet!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Initials</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={score.id}>
                    <td>{index + 1}</td>
                    <td>{score.initials}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
