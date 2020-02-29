## Setting up Heroku

To set up your Heroku postgresql database, configure your app [according to this guide](https://devcenter.heroku.com/articles/heroku-postgresql). Any time you want to gain remote terminal access to your Heroku postgresql database, the command is `heroku pg:psql -a app-name`.

**Note**: For local development, you will need to create a `.env` in the `server` directory containing your `DATABASE_URL`. To find out your database URL for Heroku, go to [data.heroku.com](https://data.heroku.com/), click into your database, and under **Settings**, click *View Credentials*. Your `DATABASE_URL` something like this:

```
DATABASE_URL=postgres://{user}:{password}@{host}:{port}/{database}
```

## Running App

To start up this app in a local environment, simply run `npm run start:dev` in the root directory. This will spin up

1. nodemon server at the `server` directory, plus
2. create-react-app server at the `client` directory.

**Note**: In production, only `npm start` should be executed. This will

1. start up the nodemon server in the `server` directory,
2. create a `build` of create-react-app in the `client` directory, and
3. serve the `index.html` in `build` if a user accesses the site from any URL that *isn't* an API endpoint.