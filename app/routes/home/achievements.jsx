import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { useState, useCallback } from 'react';
import styles from './achievements.module.css';

// Certificate images
import cert1 from '~/assets/certificates/cert1.jpg';
import cert2 from '~/assets/certificates/cert2.jpg';
import cert3 from '~/assets/certificates/cert3.jpg';
import cert4 from '~/assets/certificates/cert4.jpg';
import cert5 from '~/assets/certificates/cert5.jpg';

// Event images
import event1 from '~/assets/events/event1.jpg';
import event2 from '~/assets/events/event2.jpg';

const certificates = [
    { src: cert1, caption: 'Certificate 1' },
    { src: cert2, caption: 'Certificate 2' },
    { src: cert3, caption: 'Certificate 3' },
    { src: cert4, caption: 'Certificate 4' },
    { src: cert5, caption: 'Certificate 5' },
];

const events = [
    { src: event1, caption: 'Event 1' },
    { src: event2, caption: 'Event 2' },
];

export const Achievements = ({ id, visible, sectionRef }) => {
    const [focused, setFocused] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);
    const titleId = `${id}-title`;

    const openLightbox = useCallback((src) => {
        setLightboxImage(src);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
    }, []);

    return (
        <Section
            className={styles.achievements}
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
                            <DecoderText text="Achievements" start={visible} delay={500} />
                        </Heading>

                        {/* Certificates */}
                        <div className={styles.subtitle}>Certificates</div>
                        <div className={styles.gallery}>
                            {certificates.map((cert, index) => (
                                <div
                                    key={index}
                                    className={styles.item}
                                    data-visible={visible}
                                    style={{ transitionDelay: `${index * 80 + 300}ms` }}
                                    onClick={() => openLightbox(cert.src)}
                                >
                                    <img src={cert.src} alt={cert.caption} className={styles.image} />
                                    <div className={styles.caption}>{cert.caption}</div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.divider} />

                        {/* Events */}
                        <div className={styles.subtitle}>Event Photos</div>
                        <div className={styles.gallery}>
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className={styles.item}
                                    data-visible={visible}
                                    style={{ transitionDelay: `${index * 80 + 600}ms` }}
                                    onClick={() => openLightbox(event.src)}
                                >
                                    <img src={event.src} alt={event.caption} className={styles.image} />
                                    <div className={styles.caption}>{event.caption}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Transition>

            {/* Lightbox */}
            <div
                className={styles.lightbox}
                data-visible={!!lightboxImage}
                onClick={closeLightbox}
            >
                {lightboxImage && (
                    <>
                        <button className={styles.closeButton} onClick={closeLightbox}>
                            ✕
                        </button>
                        <img
                            src={lightboxImage}
                            alt="Full size"
                            className={styles.lightboxImage}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </>
                )}
            </div>
        </Section>
    );
};
