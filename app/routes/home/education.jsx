import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { useState } from 'react';
import styles from './education.module.css';

const educationData = [
  {
    year: '2010 - 2016',
    institution: 'Christ The King Matric Higher Secondary School',
    details: 'SSLC (State Board) — 80.4%',
    location: 'Kumbakonam',
  },
  {
    year: '2021 - 2023',
    institution: 'Christ The King Matric Higher Secondary School',
    details: 'HSC — 77.5%',
    location: 'Kumbakonam',
  },
  {
    year: '2023 - 2027',
    institution: 'Chettinad College of Engineering & Technology',
    details: 'B.Tech Information Technology — Currently pursuing',
    location: 'Karur',
  },
];

export const Education = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.education}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
              <DecoderText text="Education" start={visible} delay={500} />
            </Heading>
            <div className={styles.timeline}>
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className={styles.entry}
                  data-visible={visible}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <span className={styles.year}>{edu.year}</span>
                  <span className={styles.institution}>{edu.institution}</span>
                  <span className={styles.details}>{edu.details}</span>
                  <span className={styles.location}>{edu.location}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
