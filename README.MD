# PokExplore

To grab a copy of your inventory, create a file config.json in the root directory, with the following format:

```
{
  "email": "you@gmail.com",
  "password": "password",
  "lat": 0.0,
  "lng": 0.0
}
```

You can find your current lat/lng by going to google maps and hitting the little location icon. You'll want a lat/lng near the last place you actually ran the app - this helps keep you from getting a softban. Then run inventory.js - a file inventory.json will be saved in the current directory.

Once you have your inventory, you can run index.js to have all your pokes analyzed and spit into a csv. Maybe someday there will be a nice UI or something.
