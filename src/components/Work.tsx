const Work = () => {
  useGSAP(() => {
  function getTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    return rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${getTranslateX()}`, // recalculated on every refresh
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: () => -getTranslateX(), // recalculated on every refresh
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
