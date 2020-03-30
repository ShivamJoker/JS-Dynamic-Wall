const images = {
  dark: ["dark-1", "dark"],
  light: ["light-1", "light-2", "light"]
};

const frontImg = document.querySelector(".front");
const backImg = document.querySelector(".back");

const changeImage = () => {
  //   const hour = new Date().getHours();
  const hour = 11;

  //check for night shift
  if (hour > 18 || hour === 0 && hour <= 4) {
    console.log("It's night");
    frontImg.style.backgroundImage = `url(./images/${images.dark[0]}.jpg)`;
  } //check for early morning b/w 4 to 7 am
  else if (hour >= 4 && hour <= 7) {
    console.log("It's Early Morning");

    backImg.style.backgroundImage = `url(./images/lightest.jpg)`;
    setTimeout(() => {
      frontImg.classList.add("noOpacity");
    });
  } else if (hour >= 7 && hour <= 10) {
    // now for morning b/w 8 to 10
    console.log("It's morning");
    backImg.style.backgroundImage = `url(./images/${images.light[1]}.jpg)`;
    setTimeout(() => {
      frontImg.classList.add("noOpacity");
    });
    // now for evening b/w 4 to 7 PM
  } else if (hour >= 16 && hour <= 18) {
    // now for morning b/w 8 to 10
    console.log("It's evemomg ");
    backImg.style.backgroundImage = `url(./images/${images.light[0]}.jpg)`;
    setTimeout(() => {
      frontImg.classList.add("noOpacity");
    });
  } // now for day
  else {
    console.log("It's day");
    backImg.style.backgroundImage = `url(./images/day.jpg)`;
    setTimeout(() => {
      frontImg.classList.add("noOpacity");
    });
  }
  // setTimeout(() => {
  //   frontImg.style.backgroundImage = `url(./images/${images.light[2]}.jpg)`;
  //   frontImg.classList.remove("noOpacity");
  // }, 2100);
};

changeImage();

setTimeout(
  () =>
    setInterval(
      () => changeImage(),
      // Run every hour
      60 * 60 * 1000
    ),
  // Starting from first upcoming hour, change as you wish
  (60 - new Date().getMinutes()) * 60000
);
