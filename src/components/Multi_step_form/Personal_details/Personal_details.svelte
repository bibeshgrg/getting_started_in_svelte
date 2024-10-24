<script lang="ts">
    import Input from "$lib/components/ui/input/input.svelte";
    import * as Select from "$lib/components/ui/select";
    import Icon from '@iconify/svelte';
  import { writable } from "svelte/store";

    //form attributes for Personal details
    type PersonalFormAttributes = {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string; 
        password:string;
        profile_image: string | null; 
    }

    // Declare variables to hold the values for the form inputs
    let first_name: string = "";
    let last_name: string = "";
    let email: string = "";
    let phone_number: string = ""; 
    let password: string = ""; 
    let profile_image: string | null = null;

    export let userMultiStepFormData;
    export let updateFields: (fields: Partial<PersonalFormAttributes>) => void;

    let selectedImage = writable<string | null>(null);

    function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            selectedImage.set(e.target?.result as string);
            updateFields({ profile_image: imageUrl });

        };
        reader.readAsDataURL(file);
    }
}

</script>

<div class="flex flex-col space-y-7">
    <div class="text-xl md:text-2xl text-center py-3">Personal Details</div>

    <div class="flex flex-col justify-center items-center w-full ">
        <div
           
            class="space-y-5 w-[30rem]"
            on:submit|preventDefault={() => updateFields({ first_name, last_name, email, phone_number,password,profile_image })} 
        >
        <div class="flex justify-center">
            <input
                class="hidden"
                type="file"
                id="profile_pic"
                accept="image/*" 
                
                on:change={handleFileChange}
            />
            <label 
                class="flex justify-center items-center 
                       rounded-full h-52 w-52 
                       border-4  border-gray-300 cursor-pointer relative hover:border-sky-300"
                for="profile_pic">
                {#if $userMultiStepFormData.profile_image}
                    <img
                        src="{$userMultiStepFormData.profile_image}"
                        alt="Profile Preview"
                        class="rounded-full h-full w-full object-cover"
                    />
                {:else}
                    <Icon icon="solar:pen-bold" class="text-gray-400" />
                {/if}
            </label>
        </div>
        
       

            <div class="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5 justify-between">
                <div>
                    <Input 
                        class="md:w-56" 
                        placeholder="First Name" 
                        id="first_name" 
                        type="text"
                        bind:value={$userMultiStepFormData.first_name}
                        on:input={(e) => updateFields({ first_name: (e.target as HTMLInputElement).value })}
                        required
                    />
                </div>
                <div>
                    <Input 
                        class="md:w-56"  
                        placeholder="Last Name"  
                        id="last_name"
                        type="text"
                        bind:value={$userMultiStepFormData.last_name}
                        on:input={(e) => updateFields({ last_name: (e.target as HTMLInputElement).value })}
                    />
                </div>
            </div>

            <div class="flex flex-col">
                <div>
                    <Input 
                        class="w-full"
                        placeholder="Email" 
                        id="email" 
                        type="email"
                        bind:value={$userMultiStepFormData.email}
                        on:input={(e) => updateFields({ email: (e.target as HTMLInputElement).value })}
                    />
                </div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                    <Select.Root>
                        <Select.Trigger class="w-[12rem]">
                            <Select.Value placeholder="Country Code" />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="light">+977</Select.Item>
                            <Select.Item value="dark">+971</Select.Item>
                            <Select.Item value="system">+999</Select.Item>
                        </Select.Content>
                    </Select.Root>
                    <Input 
                        placeholder="Phone Number" 
                        id="phone_number" 
                        type="number"
                        bind:value={$userMultiStepFormData.phone_number}
                        on:input={(e) => updateFields({ phone_number: (e.target as HTMLInputElement).value })}
                    />
                </div>
            </div>

            <div class="flex flex-col">
                <div>
                    <Input 
                        placeholder="Password" 
                        id="password" 
                        type="password"
                        bind:value={$userMultiStepFormData.password}
                        on:input={(e) => updateFields({ password: (e.target as HTMLInputElement).value })}
                    />
                </div>
            </div>

        </div>
    </div>

    <div id="personal_details_summary" class="border-2 rounded-lg px-3 py-8 shadow-md w-1/2">
        <div class="text-2xl py-2 font-semibold">
            Preview
        </div>
        <div class="flex flex-row space-x-1">
            <div class="flex flex-row  justify-start items-center space-x-2 xl:text-base font-light">
                <span><Icon icon="iconamoon:profile-fill" class="text-gray-400" /></span>
                <span>{$userMultiStepFormData.first_name} {$userMultiStepFormData.last_name}</span>
            </div>
        </div>

        <div class="flex flex-row  justify-start items-center space-x-2 xl:text-base font-light">
            <div class="xl:text-base font-light">{$userMultiStepFormData.email}</div>
        </div>

        <div class="flex flex-row  justify-start items-center space-x-2 xl:text-base font-light">
            <div class="xl:text-base font-light">{$userMultiStepFormData.phone_number}</div>
        </div>
        
    
    </div>
</div>


<style>
    label {
        transition: border-color 0.3s;
    }
</style>