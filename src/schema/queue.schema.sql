CREATE TABLE queue (
  id TEXT PRIMARY KEY,
  patient_id TEXT,
  physician_id TEXT,
  note TEXT,
  ticket_number TEXT,
  date_created TIMESTAMP,
  last_updated TIMESTAMP,
  status TEXT
);