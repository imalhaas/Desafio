<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // Obtém os parâmetros da URL
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
  <h1 class="text-2xl font-bold">Dados do Candidato</h1>
  <p><strong>Nome:</strong> {name}</p>
  <p><strong>Telefone:</strong> {phone}</p>
  <p><strong>Email:</strong> {email}</p>
  <button on:click={goBack} class="btn btn-primary">Voltar ao Desafio</button>
</main>

  