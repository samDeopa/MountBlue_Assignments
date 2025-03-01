const PersonalInfo = `
  <div class="flex flex-col gap-8 w-[70%]">
    <div>
      <h1 class="font-bold text-2xl text-[#02295a]">Personal info</h1>
      <p class="text-[#9699ab] text-sm">Please provide your name, email address, and phone number.</p>
    </div>

    <div class="flex flex-col">
      <label class="text-[#02295a]" for="name">Name</label>
      <input 
        type="text" 
        id="name" 
        class="p-2 border rounded border-[#d6d9e6]" 
        placeholder="e.g. Sameer Chand" 
      />
    </div>

    <div class="flex flex-col">
      <label class="text-[#02295a]" for="email">Email Address</label>
      <input 
        type="email" 
        id="email" 
        class="p-2 border rounded border-[#d6d9e6]" 
        placeholder="e.g. minion@gmail.com" 
      />
    </div>

    <div class="flex flex-col">
      <label class="text-[#02295a]" for="phone">Phone Number</label>
      <input 
        type="tel" 
        id="phone" 
        class="p-2 border rounded border-[#d6d9e6]" 
        placeholder="e.g. +91 7456858123" 
      />
    </div>
  </div>

  <div class="w-[70%] flex justify-between mt-4">
    <button class="back-btn text-[#d6d9e6] px-5 h-10 rounded">Go Back</button>
    <button class="next-btn bg-[#02295a] text-white px-5 h-10 rounded">Next Step</button>
  </div>
`;

export { PersonalInfo };
