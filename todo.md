## Create a multi-user music engine

### Meta

-   configure my dev station
    -   ~~long terminal history~~
    -   ~~Add VS Code configuration from work (use a git repo, or https://code.visualstudio.com/docs/editor/settings-sync)~~
    -   ~~install VS Code extensions from work~~
    -   Start using zsh keybindings
    -   Set up VS Code SSH
    -   ~~Set up React + Flask hot reloading~~

### Pattern layer

-   ~~Local React setup~~
-   ~~React pattern visualization~~
-   ~~Play & pause~~
    -   ~~Implement play/stop button change state~~
    -   ~~Implement animations of cells~~
        - ~~On play, set 1st column visual~~
        - ~~play tone based on filled cells~~
        - ~~use transport timing callback?~~
    -   ~~Fix doesn't work on reload bug~~
-   backend
    -   ~~define data schema for opening sequencer~~
    -   ~~initialize sequencer from data~~
    -   ~~Get data from endpoint~~
    -   ~~List view of saved sequences (list from another endpoint; view list on same page)~~
    -   ~~load data from database (sqlite3)~~
    -   ~~save changes to sequence continuously~~
    -   ~~create new sequences~~
-   ~~deploy to EC2~~
    -   ~~create virtual machine~~
    -   ~~pull repo~~
    -   ~~launch project~~
    -   ~~access from web~~
-   hook up my domain name
    -   ~~point domain name to EC2 IP address~~
    -   Forward ports 80 & 443 to port 5000
    -   Set up Let's Encrypt


## After first deploy
-   set up relative file paths in app.py
-   security thing
    -   Improve your instances' security. Your security group, launch-wizard-1, is open to the world.
        Your instances may be accessible from any IP address. We recommend that you update your security group rules to allow access from known IP addresses only.
        You can also open additional ports in your security group to facilitate access to the application or service you're running, e.g., HTTP (80) for web servers
-   Better sequencer
    -   Implement 3-value speed
    -   Use Sampler
    -   Load files
    -   drag to draw/delete

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
