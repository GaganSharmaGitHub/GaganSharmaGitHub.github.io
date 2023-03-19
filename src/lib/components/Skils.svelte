<script>
  import { allSkills } from "../../interface/skill";

</script>
<div class=" h-96 relative">
    {#each allSkills as skill }
    <div class="absolute top-0 left-0 w-52 bg-white flex justify-center items-center overflow-hidden flex-col">
        <img src={skill.image} alt="">
        <p class="text-black">{skill.title}</p>
    </div>
    {/each}
</div>