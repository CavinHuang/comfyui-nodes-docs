---
tags:
- RegionalPrompt
---

# Regional Prompt Simple (Inspire)
## Documentation
- Class name: `RegionalPromptSimple __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

The RegionalPromptSimple node is designed to generate regional prompts based on a given basic pipeline configuration and a mask. It utilizes the basic components of a generative model pipeline, including model, clip, and VAE settings, along with positive and negative prompts, to create new prompts that are regionally focused. This node is essential for tasks that require targeted prompt generation within specific areas of an image, enabling more precise control over the generative process.
## Input types
### Required
- **`basic_pipe`**
    - Represents the foundational components of the generative model pipeline, including the model, clip, VAE, and positive and negative prompts. It is crucial for defining the base upon which regional prompts are generated.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, List[Tuple[str, Dict]], List[Tuple[str, Dict]]]`
- **`mask`**
    - A binary mask that specifies the region of interest within an image. It plays a pivotal role in determining where the regional prompts will be applied, allowing for targeted prompt generation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`cfg`**
    - The configuration setting for the generative model, influencing the detail and quality of the generated prompts.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the sampling method to be used in the generative process, affecting the diversity and quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for the generative model, impacting the progression and variation of the generated prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`wildcard_prompt`**
    - An optional prompt that can be dynamically inserted into the generation process, offering flexibility and creativity in prompt design.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`controlnet_in_pipe`**
    - A boolean flag indicating whether to keep or override existing control settings in the pipeline, affecting the influence of control mechanisms on the generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`sigma_factor`**
    - A scaling factor for the noise level in the sampling process, allowing for fine-tuning of the prompt generation's randomness and variability.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`regional_prompts`**
    - Comfy dtype: `REGIONAL_PROMPTS`
    - The generated regional prompts, tailored to the specified region of interest within the image, enabling targeted and precise control over the content generation.
    - Python dtype: `List[Tuple[str, Dict]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalPromptSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "basic_pipe": ("BASIC_PIPE",),
                "mask": ("MASK",),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (common.SCHEDULERS,),
                "wildcard_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "wildcard prompt"}),
                "controlnet_in_pipe": ("BOOLEAN", {"default": False, "label_on": "Keep", "label_off": "Override"}),
                "sigma_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("REGIONAL_PROMPTS", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, basic_pipe, mask, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe=False, sigma_factor=1.0):
        if 'RegionalPrompt' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'RegionalPromptSimple' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use RegionalPromptSimple, you need to install 'ComfyUI-Impact-Pack'")

        model, clip, vae, positive, negative = basic_pipe

        iwe = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode']()
        kap = nodes.NODE_CLASS_MAPPINGS['KSamplerAdvancedProvider']()
        rp = nodes.NODE_CLASS_MAPPINGS['RegionalPrompt']()

        if wildcard_prompt != "":
            model, clip, new_positive, _ = iwe.doit(model=model, clip=clip, populated_text=wildcard_prompt)

            if controlnet_in_pipe:
                prev_cnet = None
                for t in positive:
                    if 'control' in t[1] and 'control_apply_to_uncond' in t[1]:
                        prev_cnet = t[1]['control'], t[1]['control_apply_to_uncond']
                        break

                if prev_cnet is not None:
                    for t in new_positive:
                        t[1]['control'] = prev_cnet[0]
                        t[1]['control_apply_to_uncond'] = prev_cnet[1]

        else:
            new_positive = positive

        basic_pipe = model, clip, vae, new_positive, negative

        sampler = kap.doit(cfg, sampler_name, scheduler, basic_pipe, sigma_factor=sigma_factor)[0]
        regional_prompts = rp.doit(mask, sampler)[0]

        return (regional_prompts, )

```
