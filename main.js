// add image names here
const images = {
  dark: ["dark-1", "dark"],
  light: ["light-1", "light-2", "light"],
  lightest: ["lightest"],
  day: ["day"]
};

const frontImg = document.querySelector(".front");
const backImg = document.querySelector(".back");
const bg = document.querySelector("body");
const header = document.querySelector(".day");
const time = document.querySelector(".time");
const info = document.querySelector(".info");

//load all images
const allImg = Object.values(images).flat();

allImg.forEach(el => {
  const pic = new Image();
  pic.src = `./images/${el}.jpg`;
});

//remove the info container after 5s
setTimeout(() => {
  info.remove();
}, 5000);

//function to randomly select, change & fade image
const addImg = mode => {
  //this will get a random value from array
  const rand = Math.floor(Math.random() * images[mode].length);

  //put image in dom

  //format the url
  const url = `url(./images/${images[mode][rand]}.jpg)`;

  //if opacity class is there then add to front else add to back
  if (frontImg.classList.contains("noOpacity")) {
    frontImg.style.backgroundImage = url;
    setTimeout(() => {
      frontImg.classList.remove("noOpacity");
    });
  } else {
    backImg.style.backgroundImage = url;
    setTimeout(() => {
      frontImg.classList.add("noOpacity");
    });
  }
};

const changeImage = hour => {
  //check for night shift
  if (hour > 18 || hour === 0 || hour <= 4) {
    console.log("It's night");
    header.innerHTML = `It's Night`;
    time.innerHTML = `${hour} O'Clock`;
    addImg("dark");
  }
  //check for early morning b/w 4 to 7 am
  else if (hour >= 4 && hour <= 7) {
    console.log("It's Early Morning");
    header.innerHTML = `It's Early Morning`;
    time.innerHTML = `${hour} O'Clock`;

    addImg("lightest");
  }
  // now for morning b/w 7 to 10
  else if (hour >= 7 && hour <= 10) {
    console.log("It's morning");
    header.innerHTML = `It's Morning`;
    time.innerHTML = `${hour} O'Clock`;

    addImg("light");
  }
  // now for evening b/w 4 to 7 PM
  else if (hour >= 16 && hour <= 18) {
    console.log("It's evening");
    header.innerHTML = `It's Evening`;
    time.innerHTML = `${hour} O'Clock`;

    addImg("light");
  }
  // now for day
  else {
    console.log("It's day");
    header.innerHTML = `It's day`;
    time.innerHTML = `${hour} O'Clock`;
    addImg("day");
  }
};

changeImage(new Date().getHours());

let isPlayed = false;
let imgTimer;

//play all the images when clicked on body
bg.addEventListener("click", () => {
  console.log("you clicked me", imgTimer);

  if (!isPlayed) {
    isPlayed = true;
    //get the current hour
    let time = new Date().getHours();
    changeImage(++time);
    document.documentElement.requestFullscreen();

    //timer of 2.5s to change image
    imgTimer = setInterval(() => {
      changeImage(time);
      if (time === 24) {
        time = 0;
      }
      time++;
    }, 2500);
  } else {
    isPlayed = false;
    clearInterval(imgTimer);
    document.exitFullscreen();
    changeImage(new Date().getHours()); // now set back to current time
  }
});

setTimeout(
  () =>
    setInterval(
      () => {
        hour = new Date().getHours();
        //run the change image function every hour
        changeImage(hour);
      },
      // Run every hour
      60 * 60 * 1000
    ),
  // Starting from first upcoming hour, change as you wish
  (60 - new Date().getMinutes()) * 60000
);
