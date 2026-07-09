export default function Footer() {
  return (
    <footer className="w-full py-16 px-margin-mobile md:px-margin-desktop mt-20 border-t border-outline-variant bg-inverse-surface">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-xs">
          <h2 className="font-headline-md text-headline-md text-primary-fixed mb-4">
            Labatts Movement
          </h2>
          <p className="text-surface-container-highest font-body-md">
            Empowering the next generation of athletes through technical precision and
            elite-level instruction.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="text-primary-fixed font-label-md uppercase tracking-widest text-[11px]">
              Resources
            </h4>
            <a
              className="text-surface-container-highest font-label-sm hover:text-primary-fixed-dim transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </a>
            <a
              className="text-surface-container-highest font-label-sm hover:text-primary-fixed-dim transition-colors"
              href="/terms"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-primary-fixed font-label-md uppercase tracking-widest text-[11px]">
              Support
            </h4>
            <a
              className="text-surface-container-highest font-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="text-surface-container-highest font-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
            >
              Newsletter
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-primary-fixed font-label-md uppercase tracking-widest text-[11px]">
              Social
            </h4>
            <div className="flex gap-4">
              {/* NOTE: placeholder handles — update these hrefs once real
                  Labatts Movement accounts are created. */}
              <a
                className="text-surface-container-highest hover:text-primary-fixed transition-colors"
                href="https://www.instagram.com/labattsmovement"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a
                className="text-surface-container-highest hover:text-primary-fixed transition-colors"
                href="https://www.tiktok.com/@labattsmovement"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V9.1a7.3 7.3 0 0 0 4.5 1.55V7.6a4.3 4.3 0 0 1-4.5-4.1V2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                className="text-surface-container-highest hover:text-primary-fixed transition-colors"
                href="https://x.com/labattsmovement"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.6 10.5 20 3h-2l-5.3 6.2L8.2 3H3l6.7 9.5L3 21h2l5.7-6.6 4.7 6.6H21l-7.4-10.5Zm-2 2.3-.7-1L5.6 4.5h2l4.3 6 .7 1 5.6 7.9h-2l-4.6-6.6Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto mt-16 pt-8 border-t border-white/10">
        <p className="text-surface-container-highest font-label-sm">
          © {new Date().getFullYear()} Labatts Movement. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
