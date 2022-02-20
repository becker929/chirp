## Create a multi-user music engine

### Meta

-   configure my dev station
    -   ~~long terminal history~~
    -   ~~Add VS Code configuration from work (use a git repo, or https://code.visualstudio.com/docs/editor/settings-sync)~~
    -   ~~install VS Code extensions from work~~
    -   Start using zsh keybindings

### Pattern layer

-   ~~Local React setup~~
-   React pattern visualization
-   Play & pause
-   Maybe
    -   drag to draw

### Deployment

-   set up environment
    -   Add requirements.txt
    -   Set up Docker
    -   set up React build
-   Initial server set up
    -   Tear down GCP instance
    -   Create EC2 instance
    -   Install git and clone to server
    -   Run project on server
    -   Open project to web
    -   Connect project with chirp.anthonybecker.xyz
    -   Create manual re-deploy procedure
    -   Create health check
    -   Implement autohealing
    -   Create EC2 Deployment in GHA
        -   https://dev.to/ankushbehera/a-complete-guide-to-deploy-github-project-on-amazon-ec2-using-github-actions-and-aws-codedeploy-3f0b

### Quality Assurance

-   Add type hints and checking
-   Create tests
    -   Unit tests
    -   Functional tests
    -   e2e tests
    -   Stress tests
-   Create linting prehooks and GH Actions checks
    -   Python
        -   flake8
        -   black
        -   isort
    -   JS/HTML
        -   prettier --tab-width 4
        -   JS linting
-   Implement observability
    -   Add logging
    -   Add metrics

### Marketing

-   Post to HackerNews
-   Publish dev log
-   Update resume

### Improved instruments

-   Colors (using sample groups)
-   Patterns
-   Pitch shift?
-   Filter

### optimizations

-   Load WASM
-   Load a WASM graphical interface
-   Load WASM audio

### piano roll layer

-   ~~Start with JavaScript~~
-   ~~use existing synth~~
-   Implement a piano roll editor
-   Stream edit events to backend
    -   Create Flask app with web sockets
-   Save project to postgres, (& load from database)
-   Implement a subractive synth
    -   Find an example to implement
    -   Implement sawtooth oscillator
    -   Implement a filter
-   Implement sampler instrument

### Spacial layer

-   ~~Serve from Flask server~~
-   ~~Send a tonal + drum samples to browser~~
-   ~~Play in loop on start/stop (for time offset)~~
-   Drag & drop
-   Movement in space (with muting)
-   Distance based volume
-   Persistent
-   Multi client

## Dev Log

### 2022-02-12

I spent a few hours today running an "idea sex" brainstorming session, generating 700 ideas, and decided that the idea I like the best for a project is a multi-user online music creation environment (I already had this idea before the brainstorming, but now I'm certain it's the one I want to work on next).

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
