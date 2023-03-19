<script lang="ts">
  import { initiateCanvas } from "$lib/canvas";
  import Skils from "$lib/components/Skils.svelte";
  import Wave1 from "$lib/components/Wave1.svelte";
  import { onMount } from "svelte";
  export let prerender = true;
  let canvas: HTMLCanvasElement;
  onMount(() => {
    initiateCanvas(canvas);
  });
  const message = "H#e#y,<endline>I# #a#m# #G#a#g#a#n.";
</script>

<main>
  <section class="relative">
    <div class="w-screen h-screen overflow-hidden">
      <canvas bind:this={canvas} class="" />
    </div>
    <div
      class="text-white z-20 absolute top-0 left-0 w-screen h-screen flex items-center"
    >
      <h1 class="text-9xl text-left p-10">
        {#each message.split("<endline>") as sentence}
          <p class="flex">
            {#each sentence.split("#") as letter}
              <div class="hover:text-orange-600 hover:animate-bounce">
                <div class="min-w-[30px]">
                  {letter}
                </div>
              </div>
            {/each}
          </p>
        {/each}
      </h1>
    </div>
  </section>
  <section class="text-white ">
    <Wave1 />
    <div class="bg-orange-600 w-full flex justify-center items-center">
      <div class=" max-w-3xl">
        <h2 class="text-5xl">About me:</h2>
        <p class="text-xl">
          Hey yo! I am a young developer currently working at Nykaa. I like to
          explore new technologies and develop software solutions and quick
          hacks. I am the kid who completes a task that can be done manually in 10 minutes, by
          spending 30 minutes in writing a code for it. I am also the kid who still collects pokemon cards. I am thinking posting blogs
          on this website.... nothing to serious or techie just my doodle diary
          now in blogs. Feel free to reach out, I have a pathological tendency
          of helping people.
          <br>
          <br>
          Also I am not talented enough to have made the computer model above, all credit goes to <a class="underline" href="https://sketchfab.com/Reidicus">Reidicus</a> from sketchfab.	 
        </p>
      </div>
      <div>
        <div class="rounded-full w-60 h-60 pl-5 border border-white border-dashed" style="background: url('/pictures/gagan.jpg'); background-size: contain;"/>
      </div>
    </div>
  </section>
</main>
