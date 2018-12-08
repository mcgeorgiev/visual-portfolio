# Local Development

## To create local user data

`python manage.py loaddata portfolio/fixtures/initial_data.json`

## Edit local user data

`python manage.py dumpdata users.User --indent 4 > portfolio/fixtures/initial_data.json`

Start the dev server for local development:
```bash
docker-compose up
```

Run a command inside the docker container:

```bash
docker-compose run --rm web [command]
```


Securely add your Heroku credentials to Travis so that it can automatically deploy your changes:

```bash
travis encrypt HEROKU_AUTH_TOKEN="$(heroku auth:token)" --add
```

Commit your changes and push to master and qa to trigger your first deploys:

```bash
git commit -a -m "ci(travis): add Heroku credentials" && \
git push origin master:qa && \
git push origin master
```

You're now ready to continuously ship! ✨ 💅 🛳
