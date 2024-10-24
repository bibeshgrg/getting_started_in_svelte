<script lang="ts">
    import { onMount } from 'svelte';
    let posts: {albumId:number, title: string; url: string }[] = [];
  

    onMount(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos'); 
  
      if (!response.ok) {
        console.error('Failed to fetch posts');
        return; 
      }
  
      posts = (await response.json()).slice(10, 20);

    

    });
  </script>
  
  <div class="flex flex-col space-y-4">
    <div>Posts</div>
  
    <div class="flex flex-col space-y-6">
      {#if posts.length > 0}
        {#each posts as { title, url ,albumId}}
          <div class="flex flex-col bg-neutral-400 md:px-12 md:py-10 rounded-2xl md:space-y-7 justify-start items-start">
            <div class="text-2xl font-semibold">{title}</div>
            <div class="w-full">
              <img class="w-full  h-[400px]" src={`${url}`} alt={`Album ID: ${albumId}`}/></div>
          </div> 
        {/each}
      {:else}
        <div>No posts available.</div>
      {/if}
    </div>
  </div>
  