<template>
    <UCard class="bg-red-100">
    <template #header>
        <USkeleton class="h-4 w-[250px] mb-3" />
        <USkeleton class="h-4 w-[200px] mb-3" />
        <USkeleton class="h-4 w-[150px]" />
    </template>
    <div>
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    </div>
    <template #footer>
      <div>
        <USkeleton class="h-4 w-[100px] mb-5" />
        <USkeleton class="h-4 w-[100px]" />
      </div>
    </template>
  </UCard>
</template>