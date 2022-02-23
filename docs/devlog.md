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


