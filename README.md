# Buying Time by Casey J

<center>

:warning: :eggplant: **This comic contains NSFW-ish material and adult themes** :warning:

</center>

This project aims to save one of my favourite comics from the Flash Apocalypse.

**I am not the author of the comic**, but just a very stubborn fan who refuses to let
this fall into Internet oblivion, because it holds a special place in my heart.

I discovered the comic during a difficult/awkward period in my life; and it served as a form of
therapeutic espacism.

Another reason why I want to revive it because I appreciate many of its great elements: story, characters,
setting, aesthetics, art style, and animation; to name some. I want more people to experience them too.

## Sponsoring

If you want to show support, please go support the original artist!

There is a ["Donate" button on their website][donate] that uses PayPal.
Alternatively, you could reach out to them through Twitter ([@buyingtimecomic]), Instagram ([@caseyjart]), or email.

[donate]: http://buyingtime.webcomic.ws/donate/
[@buyingtimecomic]: https://twitter.com/buyingtimecomic
[@caseyjart]: https://www.instagram.com/caseyjart/

## Tech stuff

This repo doesn't actually host the content itself, but it provides a few scripts that scrape the chapters and
prepare it for viewing.

It relies on [Ruffle](https://ruffle.rs/) for all the heavy-lifting. In short, Ruffle is a Flash player/runtime.
Amongst other things, it allows us to experience games/artworks made in Flash using modern technologies on the web.

Initially I tried to use the Ruffle browser extension, but due to improved browser security practices
it doesn't work without making changes to the original website.

I've tried to slightly improve upon the controls/ergonomics of the original comic by adding keyboard controls to
the comic through a bit of vanilla JavaScript ([the nostalgia in this repo is _AS-tronomical_][meme]).

[meme]: https://youtu.be/TXepJ5rtLxU?t=7

### So, what do I do with this?

You will need [Ruby] and [Bundler].

After you clone and enter this repo, run `bundle install`.

From here on you use [Rake] commands to scrape the original website and prepare the files for viewing:

`bundle exec rake scrape`: generates the `chapters.json` file. You don't really need to do this, since there
probably won't be any new chapters. One can only hope, though! :eyes: :crossed_fingers:

`bundle exec rake build`: prepares the files for viewing. It optionally accepts a base dir/path
argument, too (eg `bundle exec rake build[/buyingtime]`, if it's hosted at something like `example.com/buyingtime`).

`bundle exec rake preview`: Allows you to read the comic in your browser. This might be a bit fickle if the base dir/path is changed from the default during the `build` task.

That's it! :tada:

[ruby]: https://www.ruby-lang.org/en/
[bundler]: https://bundler.io/
[rake]: https://ruby.github.io/rake/
