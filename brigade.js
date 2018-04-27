const { events, Job } = require("brigadier");

events.on("push", function(e, project) {
    console.log("Received push for commit " + e.commit);

    var build = new Job("build", "docker:18.03.1-ce");
    build.docker.enabled = true;
    build.tasks = [
        "docker build -t unguiculus/hello-brigade:1 ."
    ];
    build.run();
});