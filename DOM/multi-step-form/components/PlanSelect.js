const PlanSelect = `
<div
          id="step-1"
          class="w-[70%] flex flex-col items-center justify-around"
        >
          <div class="flex flex-col gap-[30px] w-[70%]">
            <div>
              <h1 class="font-bold text-[30px] text-[#02295a]">
                Select your plan
              </h1>
              <p class="text-[#9699ab] font-200 text-[15px]">
                You have the option of monthly or yearly billing.
              </p>
            </div>
            <div class="flex flex-col gap-[40px]">
              <div class="flex justify-between" >
                <label
                  class="gap-[40px] w-[130px] border-1 border-[#d6d9e6] rounded-xl p-[15px] flex flex-col items-start justify-between"
                >
                  <input type="radio" name="plan"  class="hidden" id="arcade" />
                  <img
                    src="./assets/images/icon-arcade.svg"
                    alt=""
                    class="rounded-full h-[40px]"
                  />
                  <div class="text-[10px]">
                    <p class="text-[#02295a] font-bold text-[14px]">Arcade</p>
                    <p class="text-[#d6d9e6] text-[12px]">$90/yr</p>
                    <p class="text-[#02295a]">2 months free</p>
                  </div>
                </label>
                <label
                  class="gap-[40px] w-[130px] border-1 border-[#d6d9e6] rounded-xl p-[15px] flex flex-col items-start justify-between"
                >
                  <input type="radio" name="plan"  class="hidden" id="advanced" />
                  <img
                    src="./assets/images/icon-advanced.svg"
                    alt=""
                    class="rounded-full h-[40px]"
                  />
                  <div class="text-[10px]">
                    <p class="text-[#02295a] font-bold text-[14px]">Advanced</p>
                    <p class="text-[#d6d9e6] text-[12px]">$120/yr</p>
                    <p class="text-[#02295a]">2 months free</p>
                  </div>
                </label>
                <label
                  class="gap-[40px] w-[130px] border-1 border-[#d6d9e6] rounded-xl p-[15px] flex flex-col items-start justify-between"
                >
                  <input type="radio" name="plan" class="hidden" id="pro" />
                  <img
                    src="./assets/images/icon-pro.svg"
                    alt=""
                    class="rounded-full h-[40px]"
                  />
                  <div class="text-[10px]">
                    <p class="text-[#02295a] font-bold text-[14px]">Pro</p>
                    <p class="text-[#d6d9e6] text-[12px]">$150/yr</p>
                    <p class="text-[#02295a]">2 months free</p>
                  </div>
                </label>
              </div>
              <div
                class="toggle self-center w-[100%] flex justify-center bg-[#EFF5FF] p-3 rounded-xl"
              >
                <p class="light-text">Annually</p>
                <label class="slider">
                  <input type="checkbox" />
                  <div class="circle"></div>
                  <div class></div>
                </label>

                <p class="light-text">Monthly</p>
              </div>
            </div>
          </div>
          <div class="w-[70%] flex justify-between mt-4">
            <button class="back-btn text-[#d6d9e6] px-5 h-10 rounded">Go Back</button>
            <button class="next-btn bg-[#02295a] text-white px-5 h-10 rounded">Next Step</button>
          </div>
          </div>
        `;

export { PlanSelect };
