import { SkillsBoard } from '@/components/dossier/skills-board';

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-wood bg-[url('/textures/wood-pattern.png')] bg-repeat overflow-x-hidden">
      <div className="w-full min-h-screen bg-[#2b1d14]/80">
        <SkillsBoard />
      </div>
    </main>
  );
}
