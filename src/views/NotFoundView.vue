<template>
  <div class="max-w-3xl mx-auto px-6 mt-16 md:mt-8">
    <div class="text-lg font-medium md:text-base mb-5">Oh no!</div>
    <div class="text-sm mb-5">
      The page you're looking for doesn't exist. But don't worry, we have
      exactly what you need:
    </div>
    <ul class="text-sm leading-7">
      <li>
        <span class="fa-solid fa-magnifying-glass mr-2"></span>
        <RouterLink
          :to="{ name: 'discover' }"
          class="font-medium hover:underline underline-offset-4 py-1"
          >Search and add movies!</RouterLink
        >
      </li>

      <li>
        <span class="fa-regular fa-star mr-2"></span>
        <RouterLink
          :to="{ name: 'collection' }"
          class="font-medium hover:underline underline-offset-4 py-1"
          >Check out your Collection!</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
