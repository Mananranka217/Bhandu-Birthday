import { useState, useEffect } from 'react';
import celebrateGif from '../../../images/celebrate.gif';
import { AnimatedText } from './AnimatedText';
import { Heart, Sparkles, MoonStar } from 'lucide-react';
import { WISH_MESSAGES, WISH_PAGE_TEXT } from '../../data/messages';
import { playHBD, stopHBD } from '../../utils/audioUtils';
import { MeYouGallery } from '../MeYouGallery';

//---- BACKGROUND DECORATION ICONS WITH POSITIONS AND STYLING ----//

const decorations = [
  { Icon: Heart, top: 'top-8', left: 'left-8', color: 'text-purple-300/40', size: 'size-8', delay: '0s' },
  { Icon: Heart, top: 'top-20', left: 'right-20', color: 'text-purple-300/30', size: 'size-6', delay: '1s' },
  { Icon: Sparkles, top: 'bottom-20', left: 'left-20', color: 'text-purple-400/50', size: 'size-6', delay: '0.5s' },
  { Icon: Heart, top: 'bottom-32', left: 'right-32', color: 'text-purple-300/40', size: 'size-10', delay: '1.5s' },
  { Icon: Sparkles, top: 'top-40', left: 'right-40', color: 'text-purple-300/40', size: 'size-8', delay: '2s' },
  { Icon: MoonStar, top: 'bottom-10', left: 'left-1/2', color: 'text-purple-400/40', size: 'size-7', delay: '0.3s' },
  { Icon: Heart, top: 'top-1/2', left: 'left-16', color: 'text-purple-200/50', size: 'size-7', delay: '0.8s' },
  { Icon: Sparkles, top: 'bottom-16', left: 'right-16', color: 'text-purple-400/40', size: 'size-5', delay: '1.2s' },
  { Icon: MoonStar, top: 'top-1/4', left: 'left-1/4', color: 'text-purple-400/40', size: 'size-6', delay: '1.8s' },
  // Additional decorations for denser background
  { Icon: Heart, top: 'top-6', left: 'right-6', color: 'text-purple-300/30', size: 'size-5', delay: '0.2s' },
  { Icon: Sparkles, top: 'bottom-6', left: 'left-6', color: 'text-purple-300/25', size: 'size-5', delay: '0.6s' },
  { Icon: MoonStar, top: 'top-12', left: 'right-50', color: 'text-purple-300/30', size: 'size-6', delay: '1.1s' },
  { Icon: Heart, top: 'bottom-8', left: 'right-50', color: 'text-purple-200/30', size: 'size-6', delay: '1.4s' },
];

// THIS FUNC SHOWS THE WISH MESSAGES WITH STYLING AND ANIMATIONS
export function WishMessage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [hasShownAllMessages, setHasShownAllMessages] = useState(false);

  useEffect(() => {
    playHBD();
    return () => stopHBD();
  }, []);

  const handleComplete = () => {
    setTimeout(() => {
      const nextIndex = (messageIndex + 1) % WISH_MESSAGES.length;
      setMessageIndex(nextIndex);
      
      // After showing all messages once, show gallery
      if (nextIndex === 0 && !hasShownAllMessages) {
        setHasShownAllMessages(true);
        setTimeout(() => {
          setShowGallery(true);
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="size-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100/50 to-purple-100 min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorations.map((dec, idx) => {
          const { Icon, color, size, delay, ...positions } = dec;
          return (
            <Icon
              key={idx}
              className={`absolute ${positions.top} ${positions.left} ${color} ${size} animate-pulse glow-anim`}
              style={{ animationDelay: delay }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 border border-purple-200/50">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="text-purple-500 size-8 fill-purple-400" />
            <Sparkles className="text-purple-400 size-6" />
            <Heart className="text-purple-500 size-8 fill-purple-400" />
          </div>

          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-2xl sm:text-3xl text-center text-purple-900/90 italic leading-relaxed">
              <AnimatedText
                key={messageIndex}
                text={WISH_MESSAGES[messageIndex]}
                speed={60}
                onComplete={handleComplete}
              />
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {WISH_MESSAGES.map((_, index) => (
              <div
                key={index}
                className={`size-2 rounded-full transition-all duration-300 ${
                  index === messageIndex ? 'bg-purple-500 w-8' : 'bg-purple-300/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-purple-700/60 italic text-sm">{WISH_PAGE_TEXT}</p>
        </div>
      </div>

      {/* Button to show gallery */}
      {!showGallery && (
        <div className="relative z-10 mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 text-white font-semibold text-base sm:text-lg shadow-lg shadow-purple-300/50 hover:shadow-purple-400/70 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/40 hover:border-white/60"
          >
            <Heart className="size-5 fill-white animate-pulse" />
            <span>Just Our Everyday Life 🤍✨</span>
            <Sparkles className="size-5 animate-pulse" />
          </button>
        </div>
      )}

      {/* Gallery section - appears after clicking button or after messages */}
      {showGallery && (
        <div className="relative z-10 w-full mt-8 sm:mt-12 px-4 sm:px-6">
          <MeYouGallery />
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
        <img
          src={celebrateGif}
          alt="Celebrate"
          className="w-28 sm:w-40 md:w-48 max-w-none block"
        />
      </div>
    </div>
  );
}


