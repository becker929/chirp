## Dev Log

### 2022-02-12

I have been thinking systematically about what idea I'd like to implement as a personal project, and decided that the idea I like the best for a project is a multi-user online music creation environment.

What make this the thing to do is:

-   It's not too difficult or too easy -- it's at the edge of what I know how to do
-   It sounds really fun and centers around a domain I want to progress in: music
-   Multi-user, stateful, near-real-time interactions make up a lot of what I've worked in and around, and I want to flesh out this skill theme
-   The most interesting form of this project is as an actuator, not a gluestick
-   There's potential down the road to play with emerging technologies in the form of Rust and WASM

All of these factors lead me to think that I can make something relatively quickly to start to show people and make it really cool over time. There's even a chance that it could be monetized later, if I make something deeply awesome.

Thanks to [this blog post](https://medium.com/geekculture/building-a-modular-synth-with-web-audio-api-and-javascript-d38ccdeca9ea) I can say that I've started the project by getting a simple synthesizer running in the browser. Later I'll want to ~~swap this out with something custom~~ rethink this from first principles to emphasize the actuator-over-gluestick nature of the project.

2022-02-15

I've made the decision to focus on the spacial layer of Chirp. The basic design is documented in the to-dos. One idea that might not be clear from these is that I don't want to use a piano roll or other DAW idioms. The basic idea is a spacial, social loop machine environment where the building blocks are very simple loops categorized (and visualized with a not-yet-determined visual idiom: plants?) by instrument + "color" + pattern. Color is similar to chord, while pattern is similar to arpeggio. I don't want users to be thinking about music theory etc, but just playing with the pre-built blocks and spacial + social aspect.

2022-02-19

I've reversed the decision to focus on the spacial layer. However, I'm not going for a piano roll, but sticking with the colors/patterns idea and going with a pattern editing idiom. Keeping the real-time social element.

I decided to use React for the front-end. I think this will speed up and make the front end interactions easier to create.

After looking at some tutorials, I decided to separate the API and frontend processes. At first, I wanted to serve the React files from the Flask app, but it seems that React tooling makes it simpler to launch the front-end from Node.

2022-02-21

The next order of business is to get the step sequencer running. I ended up finding a couple of other React-based step sequencers. I have decided to look at how [this one](https://github.com/sam-parsons/step-sequencer) is implemented and take some strategies from there.

It turns out that `step-sequencer` relies on [Tone.js](https://github.com/Tonejs/Tone.js/), which, according to [this page](https://bundlephobia.com/package/tone@14.7.77) should take up \<340kb after minification (and half an order of magnitude less with (gzip)[https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/], although I'm not sure how to implement that). It's also apparently tree-shakeable. I guess I'd want to use [webpack](https://webpack.js.org/) in my build pipeline to take advantage of that? This should help keep the size of the app down even more, since I plan to only use the Sampler (to play sound files), Reverb (to create ambience, and glue the sounds together), and Compressor (to glue the sounds together and make the mix louder), parts of the library.

I'm not going to worry about those size considerations, though, just yet. For now the strategy needs to be:

-   Adapt `step-sequencer`'s sound triggering abilities into something simpler that complies with the design I have in my head (a very simple step sequencer with pre-made sample packs)
-   Adapt the above to use `Tone.Sampler` instead of `Tone.Synth`

I'd also like to figure out how to not use `yarn`, or if I have to use `yarn`, learn a bit about how that constrains my future build pipeline choices.

2022-02-22

What a special calendar date this is!

`step-sequencer` uses Tone.js, and in fact has Tone.js control the visualization by relying on `Tone.Part`. I'm not sure that's the best design, and anyway I should learn more about how `Tone` works.

Turns out `Tone.js` has its own `Step Sequencer` example code, as well as an example `Sampler`. There's also a note about syncing visuals. So probably I should ditch `step-sequencer` and just synthesize my understanding of React with `Tone`'s own examples.

Ooh, except `Tone`'s own examples are terribly difficult to get into without building the project & etc. Wow!

[`Tone`'s installation instructions](https://github.com/Tonejs/Tone.js/wiki/Installation) specify that webpack will limit the source files included in the project to those actually used.

Agh, the local setup for examples is broken. According to [this tutorial](https://www.devbridge.com/articles/tonejs-coding-music-production-guide/) I can use a CDN. I'd like to later install the packages into the project and optimize their loading but there's no time for that now!

I got a very simple example running using the [CDN for `Tone`](https://unpkg.com/tone) . However, this "imports" `Tone` directly, rather than importing it in a `node`-style (is my ignorance of frontend showing?). I'm tempted at this point to scrap React so I can quickly get to the backend part that I'm more interested in. Not going to do that yet because I still think React will make this project a lot better. Can I use the CDN to import into the React `index.js`?

OK, I can do `import * as Tone from 'tone'`. Also, I'm noticing that `npm start` uses `webpack`.

Alright! I can actually play tones at this point.

(later that evening)

Nice! I've got a first version of a working step sequencer in the browser! The next thing I want to do with this is to use my own samples and include drum samples in a sequencer "color" (tiny sample collection). At that point it will be time to create the first version of this that has a backend which persists user-created sequences.

After that, it's roughly: deploy it, set up CI/CD pipeline, add more colors, add multiple speeds, create playlists, copy & edit sequences, create multi-user views, create an activity feed, optimize it. A few places in there I'd like to show it to more people.

I'm really happy to have gotten to this point!

2022-02-23

After running into an issue with CORS trying to serve the data from Flask to a `create-react-app` frontend, I learned that I would need to serve the app using some web server separate from CRA, so now I'm making it so that my Flask backend serves the frontend as well. This can slow down development of the frontend so I'll want to mock out the backend in order to take advantage of CRA's hot reloading.

Okay, I've decided it's important enough to have hot reloading to keep my velocity high that I'm going to try getting this working. [This blog post](https://ajhyndman.medium.com/hot-reloading-with-react-and-flask-b5dae60d9898#20b2) has some interesting ideas on how to do this.

I'm choosing not to learn Poetry for now. It seems I need to figure out Yarn.

Turns out CRA is using Yarn underneath, so `yarn start` works, and I'm guessing the rest of the tutorial should work out too.

Alright, hot reloading works, and now we're into more of my territory working on the backend, with a list of sequences and the note data for the sequences coming from a Flask server (that is also serving the frontend).

Time to hook this up to a managed Postgres instance and create the ability to edit and create new sequences!

Aaand, managed Postgres on Amazon RDS is too expensive. Any cheaper options or should I just use `sqlite3`?

I ripped [this](https://github.com/bevacqua/correcthorse/blob/master/wordlist.json) off for a word list and scrubbed just a few words out of it.

2022-02-24

(around 1am)

I've definitely stayed up too late doing this, but my app is running on EC2 and responding to web requests at its IP address. There's some kind of CORS bug to handle, and it's extremely slow, probably because of the size of the instance, being a micro. Probably I'll just have to pay a little more to get a decent sized instance and fix some bugs tomorrow.... I don't like that it took me till Thursday to get the smallest thing up and running, but that's how it is. I thought I might have something by Monday, but the weekend I rested a lot and even Monday got away from me a bit, so really it's just the last couple days I've been working really hard on this.

Tomorrow, fix the bugs, get the first version working and connect it to a nice URL!

OK, it looks like the problem is CORS, and it looks like I'm going to need to serve traffic over https to fix this. So I'm following [this tutorial](https://iserversupport.com/blog/how-to-install-lets-encrypt-ssl-on-nginx-running-python-django-flask/), which says that I need to have a domain name, so I'm following [this tutorial](https://w3path.com/point-domain-to-aws-ec2-instance/) in order to point my domain name anthonybecker.xyz at my EC2 instance. I want to see if I can use [the information here](https://ns1.com/resources/dns-propagation) to speed up DNS propogation so that I can link to my website before the end of today.

I've allocated and associated an Elastic IP with Chirp's proof of concept instance. This is not scalable! I'll want to set up some kind of auto-scaling / load-balancing system later, but this is enough for now.

I also need to route the ports properly.

anthonybecker.xyz +-->  http -> 80 (standard) ----- \
                  \-->  https -> 443 (standard) --- |
                                                    |
gunicorn <--- nginx <--- AWS Security Group <-------/

Since I'm waiting for DNS to propogate before I have the domain name pointed at my AWS Elastic IP, let me see if I can continue with Let's Encrypt.

Not sure what `An A record  and www record for the required domain name.` means. Ignoring for now.

Need `Nginx server block for the required domain ( /etc/nginx/sites-available/domain.conf )` ---> I was having an issue with this where I'm not sure whether Amazon nginx1 is configured in the standard way. I'm not even sure that nginx is actually serving my traffic at this point. How can I tell?

I've also gotta connect in a better way to my instance as the browser connection keeps becoming unresponsive.

[This tutorial](https://medium.com/techfront/step-by-step-visual-guide-on-deploying-a-flask-application-on-aws-ec2-8e3e8b82c4f7) is what I followed to deploy my app on EC2.

Running `sudo systemctl stop nginx`, which `ps -ef | grep nginx` shows did indeed kill `nginx`, and reloading http://54.177.250.166:5000/ shows that `nginx` isn't even being used to serve my app.

The Let's Encrypt tutorial seems to think that I need nginx,.... let's try moving forward anyway. Otherwise I'll need to figure out what's different with the Amazon distribution / where I need to put the configuration files.

... And DNS propogated! Woohoo!!

Going to use [this tutorial](https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https) to try setting up HTTPS instead. Remember--this is just to get the app to work at all! So I'll run the initial "ad-hoc" way just to see if I can get it working, then move forward to self-signed and Let's Encrypt.

Bah, none of the introductory bits are working. Also the above requires nginx to follow. So:

- Set up nginx
- Set up Let's Encrypt

I'm going to try following the original instructions for setting up nginx (in the medium techfront tutorial) but see if I can adapt it based on the directory structure given by the Amazon Linux Extras nginx1 installation.

First I need to set up local SSH because this browser terminal is awful. Done!

Re-installed nginx and removed the previously created file. However now the tutorial says I should be able to access the nginx landing page at the instance's public IP address, but that's not happening. Following [this tutorial](https://www.nginx.com/blog/setting-up-nginx/) I tried using `sudo systemctl start nginx.service` but the page still doesn't load from there.

Ah, probably because I skipped opening the correct port.

OK, now I get the nginx landing page on my domain name, although only for http.

Cotinuing with the techfront article. Well, the next step is the sites-available/default file, I'm going to do a little research about that

OK! My homepage, without a port specified, is now pointing to my app. Here's what my nginx configuration looks like:

`upstream chirp {
        server 127.0.0.1:5000;
}

server {
        location / {
                proxy_pass http://chirp;
        }
}`

And that's at `/etc/nginx/conf.d/server.conf`

HTTPS still doesn't work. Only http. The link to certbot is broken in the tutorial, but certbot is apparently an easy way to use Let's Encrypt. An issue might be that I don't have www subdomain set up on anthonybecker.xyz, and I might need that.

I'm going to try to follow [this tutorial](https://www.freecodecamp.org/news/going-https-on-amazon-ec2-ubuntu-14-04-with-lets-encrypt-certbot-on-nginx-696770649e76/).

Now www works.

[This page](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2.html) seems to have a lot of good information, but it assumes Apache is being used, whereas I'm using nginx. I'm going to follow the installation steps for certbot and then go back to the freecodecamp tutorial to actually run certbot.

OK, https works! Here's what my nginx `conf.d/server.conf` file looks like:

```
upstream chirp {
        server 127.0.0.1:5000;
}

server {
        listen 80;
        server_name www.anthonybecker.xyz;
        location / {
                return 301 https://$server_name$request_uri;
        }
}

server {
        listen 443 ssl;
        server_name xyz.yourdomain.com;
        ssl_certificate /etc/letsencrypt/live/www.anthonybecker.xyz/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/www.anthonybecker.xyz/privkey.pem;
        add_header Strict-Transport-Security "max-age=31536000";
        location / {
                proxy_pass http://chirp;
        }
}
```

Reading logs on console using `gunicorn -b 0.0.0.0:5000 app:app --log-file=-`. Hadn't initialized the database yet!

Okay, I've got data in my database, and of course https is working at this point, but I'm still getting this:

```
GET http://127.0.0.1:5000/sequence?sequence=incredible-shelves net::ERR_CONNECTION_REFUSED
```

This might be just because `127.0.0.1` isn't working. Or could it be because I need to request it over https? OH probably the browser assumes that `127.0.0.1` literally means the localhost of the client. So I should actually set that URL to anthonybecker.xyz!!!


BOYS WE HAVE LIFT OFF!
