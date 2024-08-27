<script lang="ts">
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
  
    let name = '';
    let phone = '';
    let email = '';
    let startChallenge = false;
    let timeLeft = 15 * 1000; // 15 segundos em milissegundos
    var timerInterval: ReturnType<typeof setInterval>;
  
    const showModal = writable(false);
    const resultMessage = writable('');
  
    function startTimer() {
      startChallenge = true;
      timerInterval = setInterval(() => {
        timeLeft -= 1000;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showModal.set(true);
          resultMessage.set('Desafio finalizado com falha!');
        }
      }, 1000);
    }
  
    function submitChallenge() {
      clearInterval(timerInterval);
      if (timeLeft > 0) {
        showModal.set(true);
        resultMessage.set('Desafio finalizado com sucesso!');
        // Redireciona para a página "candidate" com os dados do formulário
        goto(`/candidate?name=${name}&phone=${phone}&email=${email}`);
      } else {
        showModal.set(true);
        resultMessage.set('Desafio finalizado com falha!');
      }
    }
</script>
  
<main class="flex flex-col items-center justify-center h-screen bg-gradient-to-l from-blue-500 to-purple-600 text-white space-y-4">
    <div>
      <label class="block mb-2">Nome:</label>
      <input type="text" bind:value={name} class="input input-bordered w-full max-w-xs" />
    </div>
    <div>
      <label class="block mb-2">Telefone:</label>
      <input type="tel" bind:value={phone} class="input input-bordered w-full max-w-xs" />
    </div>
    <div>
      <label class="block mb-2">Email:</label>
      <input type="email" bind:value={email} class="input input-bordered w-full max-w-xs" />
    </div>
    <button on:click={startTimer} class="btn btn-primary" disabled={startChallenge}>Iniciar Desafio</button>
  
    {#if startChallenge}
      <p class="text-lg">
        Tempo restante: {Math.floor(timeLeft / 1000 / 60)}:{String(Math.floor(timeLeft / 1000) % 60).padStart(2, '0')}
      </p>
      <button on:click={submitChallenge} class="btn btn-secondary">Enviar</button>
    {/if}
</main>
  
{#if $showModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={() => showModal.set(false)}>✕</button>
      <p>{$resultMessage}</p>
    </div>
    <div class="modal-backdrop" on:click={() => showModal.set(false)}></div>
  </div>
{/if}


