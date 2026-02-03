import { Heart, Sparkles } from 'lucide-react';
import { INTRO_MESSAGES } from '../../data/messages';

// Get images for background
const getMeYouImages = () => {
  const modules = (import.meta as any).glob("../../../images/me-and-you/*.{png,jpg,jpeg,gif}", {
    eager: true,
  }) as Record<string, { default: string }>;

  return Object.values(modules)
    .map((mod) => mod?.default ?? mod)
    .filter(Boolean) as string[];
};

// THIS FUNC SHOWS THE BIRTHDAY INTRO SCREEN WITH MESSAGES AND STYLING

interface BirthdayIntroProps { onStart: () => void; }

export function BirthdayIntro({ onStart }: BirthdayIntroProps): JSX.Element {
  const backgroundImages = getMeYouImages();
  // Use first 3-4 images for background, or all if less than 4
  const bgImages = backgroundImages.slice(0, Math.min(4, backgroundImages.length));

  return (
    <div className="intro-container">
      {/* Background images */}
      {bgImages.length > 0 && (
        <div className="intro-background-images">
          {bgImages.map((src, idx) => (
            <div
              key={src + idx}
              className="intro-bg-image"
              style={{
                backgroundImage: `url(${src})`,
                animationDelay: `${idx * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="intro-content">
        <div className="intro-decoration intro-decoration-top">
          <Heart className="intro-icon intro-heart-1" />
          <Sparkles className="intro-icon intro-sparkle-1" />
          <Heart className="intro-icon intro-heart-2" />
        </div>

        <div className="intro-text-section">
          <div className="intro-birthday-title">
            <Heart className="intro-title-icon" />
            <h1 className="intro-title-main font-extrabold">
              Happy Birthday Bhandu, 23 Years Wasted, 100 Years More To Go 💕
            </h1>
            <Sparkles className="intro-title-icon" />
          </div>

          <p className="intro-subtitle">
            {INTRO_MESSAGES.subtitle}
          </p>

          <div className="intro-message">
            <p className="intro-paragraph intro-paragraph-1">
              {INTRO_MESSAGES.description1}
            </p>
            <p className="intro-paragraph intro-paragraph-2">
              {INTRO_MESSAGES.description2}
            </p>
          </div>
        </div>

        <div className="intro-decoration intro-decoration-bottom">
          <Sparkles className="intro-icon intro-sparkle-2" />
          <Heart className="intro-icon intro-heart-3" />
          <Sparkles className="intro-icon intro-sparkle-3" />
        </div>

        <button className="intro-button" onClick={onStart}>
          {INTRO_MESSAGES.button}
        </button>
      </div>
    </div>
  );
}
