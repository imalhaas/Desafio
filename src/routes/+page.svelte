<script lang="ts">
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let name = '';
  let phone = '';
  let email = '';
  let startChallenge = false;
  let timeLeft = 15 * 1000; // 15 seconds in milliseconds
  var timerInterval: ReturnType<typeof setInterval>;

  const showModal = writable(false);
  const resultMessage = writable('');

  function startTimer() {
    startChallenge = true;
    timeLeft = 15 * 1000; // Reset timeLeft
    timerInterval = setInterval(() => {
      timeLeft -= 1000;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showModal.set(true);
        resultMessage.set('Challenge failed!');
      }
    }, 1000);
  }

  function submitChallenge() {
    clearInterval(timerInterval);
    if (timeLeft > 0) {
      showModal.set(true);
      resultMessage.set('Challenge completed successfully!');
      // Wait for a short period to ensure the modal is displayed
      setTimeout(() => {
        // Redirect to "candidate" page with form data
        goto(`/candidate?name=${name}&phone=${phone}&email=${email}`);
      }, 1500); // Adjust the delay if needed
    } else {
      showModal.set(true);
      resultMessage.set('Challenge failed!');
    }
  }

  function closeModal() {
    showModal.set(false);
    // Redirect to the challenge page and reset the form
    goto('/').then(() => {
      // Optionally reset the state here if needed
      name = '';
      phone = '';
      email = '';
      startChallenge = false;
      timeLeft = 15 * 1000; // Reset timeLeft
    });
  }
</script>

<main class="relative flex flex-col items-center justify-center h-screen bg-gradient-to-l from-blue-500 to-purple-600 text-white space-y-4">
  <div>
    <label for="name" class="block mb-2">Name:</label>
    <input id="name" type="text" bind:value={name} class="input input-bordered w-full max-w-xs text-black" />
  </div>
  <div>
    <label for="phone" class="block mb-2">Telephone:</label>
    <input id="phone" type="tel" bind:value={phone} class="input input-bordered w-full max-w-xs text-black" />
  </div>
  <div>
    <label for="email" class="block mb-2">Email:</label>
    <input id="email" type="email" bind:value={email} class="input input-bordered w-full max-w-xs text-black" />
  </div>
  
  <button on:click={startTimer} class="btn btn-primary" disabled={startChallenge}>Start Challenge</button>

  {#if startChallenge}
    <div class="absolute top-4 right-10 flex flex-col items-end">
      <p class="text-lg mb-2">
        Time : {Math.floor(timeLeft / 1000 / 60)}:{String(Math.floor(timeLeft / 1000) % 60).padStart(2, '0')}
      </p>
      <button on:click={submitChallenge} class="btn btn-secondary">Submit</button>
    </div>
  {/if}
</main>

{#if $showModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-10 top-5" on:click={closeModal}>✕</button>
      <p>{$resultMessage}</p>
    </div>
    <div class="modal-backdrop" on:click={closeModal}></div>
  </div>
{/if}












