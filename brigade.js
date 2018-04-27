const { events, Job, Group } = require("brigadier");

events.on("push", function(event, project) {
    var build = new Job("hello-brigade-build", "docker:18.03.1-ce");
    build.privileged = true
    build.storage.enabled = false;
    build.docker.enabled = true;
    build.cache.enabled = false
    build.tasks = [
        "docker build -t unguiculus/hello-brigade:1 src"
    ];
    build.run();

    var push = new Job("hello-brigade-push", "docker:18.03.1-ce");
    push.privileged = true
    push.storage.enabled = false;
    push.docker.enabled = true;
    push.cache.enabled = false
    push.env.DOCKER_USER = project.secrets.dockerUser
    push.env.DOCKER_PASSWORD = project.secrets.dockerPassword
    push.tasks = [
        "docker login --username $DOCKER_USER --password $DOCKER_PASSWORD",
        "docker push unguiculus/hello-brigade:1"
    ];
    push.run();

    Group.runEach([build, push])
});