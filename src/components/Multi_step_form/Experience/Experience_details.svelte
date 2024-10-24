<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";


    //form attributes for experience form details
    type ExperienceFormAttributes ={
        job_name: string;
        job_experience_year: number;
        company_name: string;
    }

    let job_name:string = " ";
    let job_experience_year:number = 0;
    let company_name:string = " ";
  
    export let userMultiStepFormData;
    export let updateFields: (fields: Partial<ExperienceFormAttributes>) => void;
  
  </script>
  
  <div class="flex flex-col space-y-7">
      <div class="text-xl md:text-2xl text-center py-2">Exprience Details</div>
  
      <div class="flex flex-col justify-center items-center w-full ">
          <div
              class="space-y-5 w-[30rem]"
              on:submit|preventDefault={() => updateFields({ job_name, job_experience_year, company_name })} 
          >
  
              <div class="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 justify-between">
                  <div>
                      <Input 
                          class="md:w-56" 
                          placeholder="Job Name" 
                          id="job_name" 
                          type="text"
                          bind:value={$userMultiStepFormData.job_name}
                          on:input={(e) => updateFields({ job_name: (e.target as HTMLInputElement).value })}
                          required
                      />
                  </div>
                  <div>
                    <Input 
                        class="md:w-56"  
                        placeholder="Experience Year"  
                        id="job_experience_year"
                        type="number"
                        bind:value={$userMultiStepFormData.job_experience_year}
                        on:input={(e) => updateFields({ job_experience_year: parseFloat((e.target as HTMLInputElement).value) || 0 })}
                        required
                />
                
                  </div>
              </div>
  
              <div class="flex flex-col">
                  <div>
                      <Input 
                          class="w-full"
                          placeholder="Company Name" 
                          id="company_name" 
                          type="text"
                          bind:value={$userMultiStepFormData.company_name}
                          on:input={(e) => updateFields({ company_name: (e.target as HTMLInputElement).value })}
                          required
                      />
                  </div>
              </div>
  
          </div>
      </div>
  </div>
  