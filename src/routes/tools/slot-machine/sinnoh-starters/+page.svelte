<script lang="ts">
  import { onMount } from "svelte";
  import { ConfettiExplosion } from "svelte-confetti-explosion";
  import type { Slot, Door } from "../../../../interface/slot-machine";
  const choices: Slot[] = [
    {
      name: "Piplup",
      image: "https://www.pkparaiso.com/imagenes/shuffle/sprites/393.png",
    },
    {
      name: "Chimchar",
      image: "https://www.pkparaiso.com/imagenes/shuffle/sprites/390.png",
    },
    {
      name: "Turtwig",
      image: "https://www.pkparaiso.com/imagenes/shuffle/sprites/387.png",
    },
  ];
  function shuffle(arr: Slot[]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }
  let chosen = choices[0];
  let frames = 0;
  const randomSlots = () => {
    const slots: Slot[] = [];
    for (let index = 0; index < choices.length * 20; index++) {
      slots.push(
        choices[Math.ceil(Math.random() * choices.length) % choices.length]
      );
    }
    choices.forEach((e) => slots.push(e));
    return shuffle(slots);
  };
  let doors: Door[] = [];
  let isSpinning = false;
  let finished = false;

  const start = () => {
    if (!isSpinning && !finished) {
      isSpinning = true;
      chosen = choices[Math.floor(Math.random() * choices.length)];
    }
  };

  onMount(() => {
    doors = [
      {
        slots: randomSlots(),
        currentPosition: 0,
        stopped: false,
      },
      {
        slots: randomSlots(),
        currentPosition: 0,
        stopped: false,
      },
      {
        slots: randomSlots(),
        currentPosition: 0,
        stopped: false,
      },
    ];
    setInterval(() => {
      if (isSpinning && !finished) {
        spin();
      }
    }, 200);
  });
  const init = () => {};
  const spin = () => {
    frames++;
    doors.forEach((door) => {
      if (!door.stopped) {
        door.currentPosition += 1;
        door.currentPosition = door.currentPosition % door.slots.length;
        if (door.boxes && door.element)
          door.boxes.style.transform = `translateY(-${
            ((door.element.clientHeight || 0) - 10) * door.currentPosition
          }px)`;
      }
      if (frames > 20) {
        if (door.slots[door.currentPosition].name === chosen.name) {
          door.stopped = true;
        }
      }
    });
    if (doors.reduce<boolean>((acc, c) => c.stopped && acc, true)) {
      finished = true;
      isSpinning = false;
    }
  };
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
  <div>
    <h1 class="text-white text-4xl py-5">
      {#if isSpinning}
        Spinning!!!
      {:else if finished}
        {chosen.name} won!
      {:else}
        Click anywhere to spin
      {/if}
    </h1>
  </div>
  <div>
    {#if finished}
      <ConfettiExplosion />
    {/if}
  </div>
  <div class="flex">
    {#each doors as door}
      <div class="door" bind:this={door.element}>
        <div class="boxes" bind:this={door.boxes}>
          {#each door.slots as slot, i}
            <div class="box">
              <img src={slot.image} alt="" />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div class="h-36 rounded p-4">
    {#if finished}
      <img
        class="h-full rounded-lg"
        src="/pictures/pokemon-drawing/{chosen.name}.jpeg"
        alt={chosen.name}
      />
    {/if}
  </div>
</div>
<svelte:window on:click={start} />

<style>
  .door {
    background: #fafafa;
    width: 100px;
    height: 110px;
    overflow: hidden;
    border-radius: 5px;
    margin: 5px;
  }

  .boxes {
    transition: transform 0.2s ease-in-out;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
</style>
