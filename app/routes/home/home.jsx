import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
// Custom project images
import busnavTexture from '~/assets/busnav-project.png';
import instiTrackTexture from '~/assets/institrack-project.png';
import readifyTexture from '~/assets/readify-project.png';
import collexTexture from '~/assets/collex-project.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { Education } from './education';
import { Achievements } from './achievements';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Tech Innovator + Developer',
    description: `Portfolio of ${config.name} — a tech innovator and developer focused on building impactful digital products and AI solutions.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();
  const education = useRef();
  const achievements = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details, education, achievements];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="BusNav - City Bus Guidance"
        description="A city bus guidance system that helps users find routes, stops, and destinations easily using interactive visuals"
        buttonText="View project"
        buttonLink="#project-1"
        model={{
          type: 'laptop',
          alt: 'BusNav bus guidance system',
          textures: [
            {
              srcSet: `${busnavTexture} 1280w, ${busnavTexture} 2560w`,
              placeholder: busnavTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Readify & Litro - Tamil AI Apps"
        description="AI-powered applications for Tamil literature: Readify reads poems aloud with natural pronunciation, Litro helps engage with Tamil classics"
        buttonText="View project"
        buttonLink="#project-2"
        model={{
          type: 'phone',
          alt: 'Readify Tamil poetry app',
          textures: [
            {
              srcSet: `${readifyTexture} 375w, ${readifyTexture} 750w`,
              placeholder: readifyTexture,
            },
            {
              srcSet: `${readifyTexture} 375w, ${readifyTexture} 750w`,
              placeholder: readifyTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="InstiTrack - College Bus Tracking"
        description="An innovative bus tracking app for colleges that allows students to view their bus's live location and stop alerts"
        buttonText="View project"
        buttonLink="#project-3"
        model={{
          type: 'laptop',
          alt: 'InstiTrack college bus tracking',
          textures: [
            {
              srcSet: `${instiTrackTexture} 800w, ${instiTrackTexture} 1920w`,
              placeholder: instiTrackTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Collex - Student Project Marketplace"
        description="A web platform for students to showcase and sell their academic projects. Built with HTML, CSS, and JavaScript with scalable UI for future backend integration."
        buttonText="View project"
        buttonLink="https://github.com/karthikeyan-947/Collex"
        model={{
          type: 'laptop',
          alt: 'Collex student project marketplace',
          textures: [
            {
              srcSet: `${collexTexture} 800w, ${collexTexture} 1920w`,
              placeholder: collexTexture,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Education
        sectionRef={education}
        visible={visibleSections.includes(education.current)}
        id="education"
      />
      <Achievements
        sectionRef={achievements}
        visible={visibleSections.includes(achievements.current)}
        id="achievements"
      />
      <Footer />
    </div>
  );
};
