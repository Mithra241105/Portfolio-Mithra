import { AnimatedTimeline } from '@/components/dossier/animated-timeline';

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-wood bg-[url('/textures/wood-pattern.png')] bg-repeat overflow-x-hidden">
      <div className="w-full min-h-screen bg-[#2b1d14]/90">
        <AnimatedTimeline />
      </div>
    </main>
  );
}
