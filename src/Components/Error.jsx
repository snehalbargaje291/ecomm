import React from "react";

const Error = () => {
  return (
    <div>
      <div class="pt-20 bg-slate-900">
        <div class="flex justify-center items-center flex-col">
          <img src="public/not-found.png" alt="" className="h-32 w-32" />

          <h1 class="mt-6 text-2xl font-bold tracking-tight text-gray-300 sm:text-4xl">
            Uh-oh!
          </h1>

          <p class="mt-4 text-gray-500 dark:text-gray-400">
            We can't find that page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
