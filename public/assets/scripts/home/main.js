// Load background particles
particlesJS.load('particles-js', '/assets/scripts/home/particlesjs-config.json');

function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[a.getMonth()].toUpperCase() + ' ' + a.getDay() + ', ' + a.getFullYear();
}

// Fetch releases from GitHub
fetch('https://api.github.com/repos/Digital-512/expressjs-login/releases').then(function (response) {
    return response.json();
}).then(function (data) {
    var releases = document.getElementById('releases-box');
    var version = document.getElementById('version');
    // Show the latest release version
    version.innerText = 'Currently ' + data[0].tag_name;
    // Show releases list
    var list = '';
    data.slice(-3).forEach(function (item) {
        list += '<div><h6>' + timeConverter(item.published_at) + '</h6><a href="' + item.html_url + '">' + item.name + '</a><p class="mz-typography--subhead-color-contrast">' + item.body + '</p></div>'
    });
    releases.innerHTML = list || '<h6>NO RELEASES</h6>';
}).catch(function (error) {
    console.log('Failed to fetch releases: ' + error);
});
