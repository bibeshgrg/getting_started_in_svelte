<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import PersonalDetails from './Personal_details/Personal_details.svelte';
    import ExperienceDetails from './Experience/Experience_details.svelte';

    // Type for form attributes
    type UserFormDataAttributes = {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        job_name: string;
        job_experience_year: number;
        company_name: string;
        profile_image: string | null; 
    };

    // Initial form values
    const initialValuesInTheForm: UserFormDataAttributes = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        job_name: '',
        job_experience_year: 0,
        company_name: '',
        profile_image: ''
    };

    // Writable store to handle form data
    let userMultiStepFormData = writable(initialValuesInTheForm);

    // Update function to merge new fields into the form data
    function updateUserFormFields(fields: Partial<UserFormDataAttributes>) {
        userMultiStepFormData.update((formData) => ({
            ...formData,
            ...fields
        }));
    }

    // Type definition for steps
    type Step = {
        component: any;
    };

    // Multi-step form logic with explicit return types
    function useMultiStepForm(steps: Step[]): {
        currentStepIndex: Writable<number>;
        steps: Step[];
        next: () => void;
        back: () => void;
        goTo: (index: number) => void;
    } {
        let currentStepIndex: Writable<number> = writable(0);

        const next = () => {
            currentStepIndex.update((index) => (index < steps.length - 1 ? index + 1 : index));
        };

        const back = () => {
            currentStepIndex.update((index) => (index > 0 ? index - 1 : index));
        };

        const goTo = (index: number) => {
            currentStepIndex.set(index);
        };

        return {
            currentStepIndex,
            steps,
            next,
            back,
            goTo
        };
    }

    // Steps and components for the form
    const steps: Step[] = [
        { component: PersonalDetails },
        { component: ExperienceDetails }
    ];

    // Use multi-step form and get currentStepIndex store
    const { currentStepIndex, next, back, steps: formSteps } = useMultiStepForm(steps);

    // Create a reactive variable for form steps length
    let formStepsLength = formSteps.length; // Initialize with current length

    // Reactive declaration to update formStepsLength whenever formSteps changes
    $: formStepsLength = formSteps.length;

    // Progress calculation
    let progress: number;
    $: $currentStepIndex = $currentStepIndex;
    $: progress = (($currentStepIndex + 1) / formStepsLength) * 100;

    // Form submission handler
    function onFormSubmission(event: Event) {
        event.preventDefault();
        if ($currentStepIndex < formStepsLength - 1) {
            next();
        } else {
            console.log('Form submitted with data:', $userMultiStepFormData);
        }
    }
</script>

<div class="md:w-[900px] relative bg-white border border-1 border-solid p-8 m-8 rounded-lg font-sans shadow-2xl">
    <div class="progress-container">
        <div class="progress-bar" style="width: {progress}%"></div>
    </div>
    <form on:submit={onFormSubmission}>
        <div class="absolute top-2 right-2">
            {$currentStepIndex + 1} / {formStepsLength}
        </div>
        <svelte:component
            this={formSteps[$currentStepIndex].component}
            bind:userMultiStepFormData
            updateFields={updateUserFormFields}
        />
        <div class="mt-4 flex gap-2 justify-end">
            {#if $currentStepIndex > 0}
                <button type="button" on:click={back} class="p-2 bg-primaryPurple rounded-lg">
                    Back
                </button>
            {/if}
            <button type="submit" class={`p-2 rounded-lg ${$currentStepIndex === formStepsLength - 1 ? 'bg-sky-500' : 'bg-sky-200'}`}>
                {$currentStepIndex === formStepsLength - 1 ? 'Submit' : 'Next'}
            </button>
        </div>
    </form>
</div>

<style>
    .progress-container {
        height: 5px;
        background-color: #f0f0f0;
        border-radius: 5px;
        overflow: hidden;
    }
    .progress-bar {
        height: 100%;
        background-color: #6200ea;
        transition: width 0.3s ease-in-out;
    }
</style>
