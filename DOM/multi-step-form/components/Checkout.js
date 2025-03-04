const Checkout = `
 <div
          id="step-1"
          class="w-[70%] flex flex-col items-center justify-around"
        >
<div class="flex flex-col gap-[30px] w-[70%]">
          <div>
            <h1 class="font-bold text-[30px] text-[#02295a]">Finishing Up</h1>
            <p class="text-[#9699ab] font-200 text-[15px]">
              Double check everything looks OK before confirming.
            </p>
          </div>
          <div class="flex flex-col gap-[40px]">
            <div>
              <div class="flex flex-col bg-[#EFF5FF] rounded-xl p-5 gap-4">
                <div
                  class="flex justify-between text-[#02295a] font-bold items-center"
                >
                  <div>
                    <p>Arcade(Yearly)</p>
                    <a
                      class="text-[#9699ab] font-200 font-normal text-[14px] underline"
                      href="www.google.com"
                    >
                      Change
                    </a>
                  </div>
                  <p>$90/yr</p>
                </div>
                <hr />
                <div class="flex flex-col gap-4">
                  <div class="flex justify-between">
                    <p
                      class="text-[#9699ab] font-200 font-normal text-[14px]"
                    >
                      Online service
                    </p>
                    <p class="text-[#02295a]">+$10/yr</p>
                  </div>
                  <div class="flex justify-between">
                    <p
                      class="text-[#9699ab] font-200 font-normal text-[14px]"
                    >
                      Larger Storage
                    </p>
                    <p class="text-[#02295a]">+$20/yr</p>
                  </div>
                </div>
              </div>
              <div class="flex justify-between p-5">
                <p class="text-[#9699ab] font-200 font-normal text-[14px]">
                  Total(per year)
                </p>
                <p class="text-[#473dff] font-bold text-[20px]">+$12/yr</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[70%] flex justify-between mt-4">
            <button class="back-btn text-[#d6d9e6] px-5 h-10 rounded">Go Back</button>
            <button class="next-btn bg-[#02295a] text-white px-5 h-10 rounded">Next Step</button>
        </div>
        </div>`;

export { Checkout };
