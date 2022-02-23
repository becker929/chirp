## Create a multi-user music engine

### Meta

-   configure my dev station
    -   ~~long terminal history~~
    -   ~~Add VS Code configuration from work (use a git repo, or https://code.visualstudio.com/docs/editor/settings-sync)~~
    -   ~~install VS Code extensions from work~~
    -   Start using zsh keybindings
    -   Set up VS Code SSH

### Pattern layer

-   ~~Local React setup~~
-   ~~React pattern visualization~~
-   Play & pause
    -   ~~Implement play/stop button change state~~
    -   ~~Implement animations of cells~~
        - ~~On play, set 1st column visual~~
        - ~~play tone based on filled cells~~
        - ~~use transport timing callback?~~
    -   Implement 3-value speed
    -   Use Sampler
    -   Load files
    -   Fix doesn't work on reload bug
-   Maybe
    -   improve timing
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
