CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES 
('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);

INSERT INTO blogs (author, url, title) VALUES 
('Edsger W. Dijkstra', 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', 'Go To Statement Considered Harmful');
