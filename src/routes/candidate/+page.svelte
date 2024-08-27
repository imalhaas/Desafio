<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // Gets the URL parameters
  $: { 
      const queryParams = new URLSearchParams($page.url.search);
      name = queryParams.get('name') || '';
      phone = queryParams.get('phone') || '';
      email = queryParams.get('email') || '';
  }

  let name: string = '';
  let phone: string = '';
  let email: string = '';

  function goBack() {
    goto('/');
  }
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gradient-to-l from-blue-500 to-purple-600 text-white space-y-4">
  <h1 class="text-2xl font-bold">Candidate Information</h1>
  <p><strong>Name:</strong> {name}</p>
  <p><strong>Telephone:</strong> {phone}</p>
  <p><strong>Email:</strong> {email}</p>
  <button on:click={goBack} class="btn btn-primary">Back to Challenge</button>
</main>



  