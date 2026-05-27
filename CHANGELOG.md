# Changelog

## 2026-05-27
- Phase 1: Added Fraunces (display) + DM Sans (body) via next/font; removed Inter and Playfair Display
- Phase 1: Updated globals.css with Option A design tokens (warm canvas #F6F4F0, forest accent #1E6B56)
- Phase 1: Extended tailwind.config with font-display, font-sans, canvas/ink/accent/surface colour aliases
- Phase 1: Created src/lib/utils.ts with cn() utility
- Phase 1: Created src/components/ui/button.tsx — primary, outline, ghost variants; sm/md/lg sizes
- Phase 1: Created src/components/layout/nav.tsx — floating pill nav, glass blur, mobile hamburger
- Phase 1: Created src/components/layout/footer.tsx — correct Co. 17060148, legal links, social
- Phase 1: Updated src/app/layout.tsx — wires Fraunces + DM Sans CSS variables, correct en-GB lang
- Phase 1: Updated src/app/page.tsx — removed Inter wrapper, uses new Nav and Footer
