import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    let rafId: number;
    const items: {
      link: HTMLElement;
      rect: DOMRect;
      mouseX: number;
      mouseY: number;
      currentX: number;
      currentY: number;
      onMouseMove: (e: MouseEvent) => void;
    }[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      const rect = elem.getBoundingClientRect();

      const state = {
        link,
        rect,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: 0,
        currentY: 0,
        onMouseMove: (e: MouseEvent) => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          if (x < 40 && x > 10 && y < 40 && y > 5) {
            state.mouseX = x;
            state.mouseY = y;
          } else {
            state.mouseX = rect.width / 2;
            state.mouseY = rect.height / 2;
          }
        },
      };

      document.addEventListener("mousemove", state.onMouseMove);
      items.push(state);
    });

    const loop = () => {
      items.forEach((state) => {
        state.currentX += (state.mouseX - state.currentX) * 0.1;
        state.currentY += (state.mouseY - state.currentY) * 0.1;
        state.link.style.setProperty("--siLeft", `${state.currentX}px`);
        state.link.style.setProperty("--siTop", `${state.currentY}px`);
      });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      items.forEach((state) => {
        document.removeEventListener("mousemove", state.onMouseMove);
      });
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/urfavsidhu" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          
            href="https://www.linkedin.com/in/sidharth-sharma-043257433"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/Sidhart46362858" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://instagram.com/urfav_sidhuu" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="#">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
