import { BuilderComponent } from '@/components/builder'

export default function Home() {
  return (
    <main className="">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="left-0 top-0 flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto rounded-xl border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Slice Generator ( React + Tailwind )
        </p>
      </div>
      <BuilderComponent/>
    </main>
  )
}
