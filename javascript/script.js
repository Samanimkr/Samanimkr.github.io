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
        name: "TrustedHousesitters",
        description: "Find pet sitters offering in-home pet care, or stay at places around the world by house sitting and caring for other's pets.",
        tags: ["React Native", "iOS", "Android"],
        imageSource: "img/trustedhousesitters.png",
        link: "https://apps.apple.com/gb/app/trustedhousesitters/id1292606611",
        linkText: 'VIEW ON APP STORE &nbsp; <i class="fab fa-app-store fa-lg"></i>',
    },
    {
        name: "Twitter Analyser",
        description: "Monitors the Twitter activity on the Rocky Horror Show and generates graphs showing real-time statistics.",
        tags: ["Twitter API", "Google Maps API"],
        imageSource: "img/twitter_analyser.png",
        link: "https://github.com/Samanimkr/tweets-analyser",
        linkText: 'VIEW PROJECT ON GITHUB &nbsp; <i class="fas fa-arrow-right"></i>',
    },
    {
        name: "8 Hours",
        description: "This is a global online programming competition, where programmers compete to make the best web application, that fits the randomly generated phrase, in 8 hours.",
        tags: ["Node JS", "Socket.io", "Javascript"],
        imageSource: "img/8_hours.png",
        link: "",
        linkText: '',
    },
    {
        name: "Quirk",
        description: "Habit Tracker which motivates and helps you become more consistent by competing against your friends.",
        tags: ["Chart JS", "MongoDB", "Facebook Login API"],
        imageSource: "img/quirk.png",
        link: "https://github.com/Samanimkr/Quirk",
        linkText: 'VIEW PROJECT ON GITHUB &nbsp; <i class="fas fa-arrow-right"></i>',
    },
];

const projectsList = document.getElementById("portfolio");

projectsData.forEach((project, i) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
        <div class="project">
            <img src="${project.imageSource}" />
            <div class="project_info">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            ${project.tags.map(tag => `<a class="tag">${tag}</a>`).join('')}
            <a class="linkToGithub" href="${project.link}" target="_blank">${project.linkText}</a>
            </div>
        </div>
        ${i < (projectsData.length-1) ? '<div class="separator"></div>' : ''}
        ${i === (projectsData.length-1) ? '<a id="more_projects" href="https://github.com/Samanimkr?tab=repositories" target="_blank">VIEW ALL PROJECTS &nbsp; <i class="fas fa-external-link-alt"></i></a>' : ''}
    `
    projectsList.appendChild(wrapper);
})
