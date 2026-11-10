# Jeff Ripke

Portfolio for Jeff Ripke. React, Node.js, and PostgreSQL. One Heroku app serves both www.jeffripke.com and www.ripkeenterprises.com.

The pages explain the software I build, including a link to [Ripke Media](https://www.ripkemedia.com). This site does not host Apple iOS app support pages.

## Run it locally

PostgreSQL has to be running.

```bash
createdb jeffripke
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173. The API runs on port 3000. Vite proxies `/api` to it.

To preview the production build:

```bash
npm run build
npm start
```

Open http://localhost:3000.

Notes from the contact form are rows in `messages`:

```bash
psql jeffripke -c "SELECT created_at, name, email, topic, body FROM messages ORDER BY created_at DESC;"
```

On Heroku, the same query is `heroku pg:psql` and then that `SELECT`.

## Deploy on Heroku

The GitHub remote for this repo is `https://github.com/jripke74/www-jeffripke-com.git`. The branch is `master`.

### 1. Install the Heroku CLI and log in

```bash
brew install heroku/brew/heroku
heroku login
```

### 2. Create the app and the database

Pick an app name that is still available. The public addresses will be the custom domains, so the Heroku name can be anything.

```bash
heroku create jeffripke-www
heroku addons:create heroku-postgresql:essential-0 -a jeffripke-www
heroku certs:auto:enable -a jeffripke-www
```

If `essential-0` is not a current plan name, list the plans and pick the smallest one you want to pay for:

```bash
heroku addons:plans heroku-postgresql
```

Heroku sets `DATABASE_URL` for you. Leave `DATABASE_SSL` unset on Heroku so the app uses SSL for the hosted database.

### 3. Push the code

From this folder, after the files are committed:

```bash
heroku git:remote -a jeffripke-www
git push heroku master
```

The `heroku-postbuild` script installs and builds the React app. The `Procfile` starts `node server/index.js`. On boot, the server creates the tables and fills them if this version of the content is not loaded yet.

Check it:

```bash
heroku open -a jeffripke-www
heroku logs --tail -a jeffripke-www
```

The `*.herokuapp.com` address should load before you point the domains at it.

### 4. Add both domains on Heroku

```bash
heroku domains:add www.jeffripke.com -a jeffripke-www
heroku domains:add jeffripke.com -a jeffripke-www
heroku domains:add www.ripkeenterprises.com -a jeffripke-www
heroku domains:add ripkeenterprises.com -a jeffripke-www
heroku domains -a jeffripke-www
```

Write down the DNS target Heroku prints for each name. It looks like `something.herokudns.com`. Each host can have its own target. Use the target from that command, not a guess.

### 5. Point the domains at Heroku

The Heroku app is already live at `https://jeffripke-www-87fe1d236350.herokuapp.com`. Custom-domain certificates stay **Failing** until DNS uses the targets below. A Namecheap URL redirect does not count. Delete URL Redirect records and old `A` records for `@` and `www` before adding these.

`jeffripke.com` uses Namecheap DNS. Domain List → Manage → Advanced DNS:

| Host | Type | Value |
| --- | --- | --- |
| `www` | CNAME | `philosophical-dreadnoughtus-2pcqxrm7qg9nmxzokvl526sb.herokudns.com` |
| `@` | ALIAS | `elementary-bat-ig6chw7su1nmklxwrce6ezt3.herokudns.com` |

`ripkeenterprises.com` is not using Namecheap’s DNS. Its nameservers are `dns1.supremedns.com` through `dns4.supremedns.com`, and the address `162.210.102.89` is old hosting. In Namecheap, open the domain → Nameservers → Namecheap BasicDNS. After that switch finishes, open Advanced DNS and add:

| Host | Type | Value |
| --- | --- | --- |
| `www` | CNAME | `objective-pigweed-spvhhejsz50m6da72084n7dx.herokudns.com` |
| `@` | ALIAS | `globular-duck-4xkasofeurk65pf55vhvyuz4.herokudns.com` |

TTL can stay Automatic. DNS can take from a few minutes to a day.

### 6. Confirm both sites

`heroku certs:auto -a jeffripke-www` lists each domain. **Failing** means the records above are not in place yet. When every row says `Cert issued`, open:

- https://www.jeffripke.com
- https://jeffripke.com
- https://www.ripkeenterprises.com
- https://ripkeenterprises.com

Check Home, Work, Projects, a project page, and Contact on a phone-width window. The header should show Menu, and activating it should show the links. On a wide window the same links should sit in the header without the Menu button.

Send a test note and read it back:

```bash
heroku pg:psql -a jeffripke-www -c "SELECT name, email, topic, left(body, 80) FROM messages ORDER BY created_at DESC LIMIT 5;"
```

## Update the words later

Career, projects, training, and interests live in `server/seed-data.js`. Raise `SEED_VERSION` by 1 when you change them. The next boot reloads that content. Rows in `messages` are kept.

Contact notes are stored in `messages` and emailed to `jeff@jeffripke.com`. Reply-To is the address the visitor typed. Mail uses the same SMTP settings as Ripke Media. Set them on Heroku before the form can send:

```bash
heroku config:set -a jeffripke-www \
  SMTP_HOST=smtp.sendgrid.net \
  SMTP_PORT=587 \
  SMTP_USER=apikey \
  SMTP_PASS=your-sendgrid-key \
  SMTP_FROM="Jeff Ripke <jeff@jeffripke.com>" \
  CONTACT_TO=jeff@jeffripke.com
```

Use the SendGrid API key already used by the media center. Do not commit it. Without those variables, production saves the note and tells the visitor the email could not be sent. Locally, with no SMTP settings, the note is printed in the server terminal instead.
