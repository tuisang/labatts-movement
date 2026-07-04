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
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-surface-container-highest font-label-sm hover:text-primary-fixed-dim transition-colors"
              href="#"
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
              <a
                className="text-surface-container-highest hover:text-primary-fixed transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
              <a
                className="text-surface-container-highest hover:text-primary-fixed transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
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
