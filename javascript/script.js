//Nav Link To: #Portfolio
$(".nav_links a:nth-of-type(1)").click(function() {
    $('html,body').animate({scrollTop: $("#portfolio").offset().top},'slow');
});
//Nav Link To: #Contact
$(".nav_links a:nth-of-type(2)").click(function() {
    $('html,body').animate({scrollTop: $("#contact").offset().top},'slow');
});
//button link to: #Portfolio
$("#scrollDown").click(function() {
    $('html,body').animate({scrollTop: $("#portfolio").offset().top},'slow');
});


const projectsData = [
    {
        name: "Twitter Analyser",
        description: "Monitors the Twitter activity on the Rocky Horror Show and generates graphs showing real-time statistics.",
        tags: ["Twitter API", "Google Maps API"],
        imageSource: "img/twitter_analyser.png",
    },
    {
        name: "8 Hours",
        description: "This is a global online programming competition, where programmers compete to make the best web application, that fits the randomly generated phrase, in 8 hours.",
        tags: ["Node JS", "Socket.io", "Javascript"],
        imageSource: "img/8_hours.png",
    },
    {
        name: "Quirk",
        description: "Habit Tracker which motivates and helps you become more consistent by competing against your friends.",
        tags: ["Chart JS", "MongoDB", "Facebook Login API"],
        imageSource: "img/quirk.png",
    },
];

const projectsList = document.getElementById("portfolio");

projectsData.forEach(project => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
        <div class="project">
            <img src="${project.imageSource}" />
            <div class="project_info">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
                ${project.tags.map(tag => `<a>${tag}</a>`).join('')}
            </div>
        </div>
        <div class="separator"></div>
    `
    projectsList.prepend(wrapper);
})
