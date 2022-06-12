# Setup
- Install Supabase CLI
  ```
  brew install supabase/tap/supabase
  ```
# Development
- Start local server
  ```
  supabase start
  ```
- After making database changes
  ```
  supabase db commit abc
  ```
- Verify generated migrate
  ```
  supabase db reset
  ```
# Deploy to server
- Connect with project on cloud
  ```
  supabase login
  ```
  ```
  supabase link --project-ref <your-project-ref>
  ```
  ```
  supabase db remote set 'postgresql://postgres:<your_password>@db.<your_project_ref>.supabase.co:5432/postgres'
  ```
- Push new migration
  ```
  supabase db push
  ```
<br/><br/>

# Backup & Restore

## Before

### Old server & New server
```sh
su postgres
psql
ALTER ROLE postgres SUPERUSER   
```
<br/>

### Dump & restore
New server
```sh
export OLD_DB_URL=postgresql://[USER]:[PASSWORD]@[host]:[port]/[DB]

example: postgresql://postgres:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ@db.rnkiprprhiaikvhivco.supabase.co:5432/postgres

pg_dump --clean --if-exists --quote-all-identifiers --dbname $OLD_DB_URL > /tmp/dump.sql

psql -U postgres -f /tmp/dump.sql
```
<br/>

## After
### Old server & new server
```sh
ALTER ROLE postgres NONSUPERUSER
```