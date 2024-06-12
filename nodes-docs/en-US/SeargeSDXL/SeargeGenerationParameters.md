---
tags:
- Searge
---

# Generation Parameters v2
## Documentation
- Class name: `SeargeGenerationParameters`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed to handle and process generation parameters for the SeargeSDXL system. It focuses on configuring and optimizing the generation settings to align with user inputs and preferences, ensuring that the output is tailored to the specific requirements of the task at hand.
## Input types
### Required
- **`seed`**
    - Specifies the initial seed for generation, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_size_preset`**
    - Selects a predefined image size for the generation, simplifying the configuration process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_width`**
    - Defines the width of the generated image, allowing for custom dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_height`**
    - Sets the height of the generated image, enabling customization of output size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps in the generation process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the CFG scale, adjusting the influence of the conditioning on the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_preset`**
    - Chooses a preset for the sampling method, affecting the generation's randomness and diversity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sampler_name`**
    - Specifies the exact sampler to be used, offering fine control over the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduler for controlling the sampling process, impacting the progression of generation steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`base_vs_refiner_ratio`**
    - Adjusts the balance between base and refiner models, tailoring the output's refinement level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`data`**
    - Incorporates various generation parameters and settings, encapsulating all necessary information for the generation.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Outputs the comprehensive set of generation parameters, configured and ready for use in the generation process.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeGenerationParameters:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xfffffffffffffff0},),
                "image_size_preset": (UI.RESOLUTION_PRESETS,),
                "image_width": ("INT", {"default": 1024, "min": 0, "max": UI.MAX_RESOLUTION, "step": 8},),
                "image_height": ("INT", {"default": 1024, "min": 0, "max": UI.MAX_RESOLUTION, "step": 8},),
                "steps": ("INT", {"default": 20, "min": 1, "max": 200},),
                "cfg": ("FLOAT", {"default": 7.0, "min": 0.5, "max": 30.0, "step": 0.5},),
                "sampler_preset": (UI.SAMPLER_PRESETS,),
                "sampler_name": (UI.SAMPLERS, {"default": "dpmpp_2m"},),
                "scheduler": (UI.SCHEDULERS, {"default": "karras"},),
                "base_vs_refiner_ratio": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.05},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(seed, image_size_preset, image_width, image_height, steps, cfg,
                    sampler_preset, sampler_name, scheduler, base_vs_refiner_ratio):

        # TODO: move to pre-processor
        if sampler_preset == UI.SAMPLER_PRESET_DPMPP_2M_KARRAS:
            (sampler_name, scheduler) = ("dpmpp_2m", "karras")
        elif sampler_preset == UI.SAMPLER_PRESET_EULER_A:
            (sampler_name, scheduler) = ("euler_ancestral", "normal")
        elif sampler_preset == UI.SAMPLER_PRESET_DPMPP_2M_SDE_KARRAS:
            (sampler_name, scheduler) = ("dpmpp_2m_sde", "karras")
        elif sampler_preset == UI.SAMPLER_PRESET_DPMPP_3M_SDE_EXPONENTIAL:
            (sampler_name, scheduler) = ("dpmpp_3m_sde", "exponential")
        elif sampler_preset == UI.SAMPLER_PRESET_DDIM_UNIFORM:
            (sampler_name, scheduler) = ("ddim", "ddim_uniform")

        return {
            UI.F_SEED: seed,
            UI.F_IMAGE_SIZE_PRESET: image_size_preset,
            UI.F_IMAGE_WIDTH: image_width,
            UI.F_IMAGE_HEIGHT: image_height,
            UI.F_STEPS: steps,
            UI.F_CFG: round(cfg, 3),
            UI.F_SAMPLER_PRESET: sampler_preset,
            UI.F_SAMPLER_NAME: sampler_name,
            UI.F_SCHEDULER: scheduler,
            UI.F_BASE_VS_REFINER_RATIO: round(base_vs_refiner_ratio, 3),
        }

    def get(self, seed, image_size_preset, image_width, image_height, steps, cfg,
            sampler_preset, sampler_name, scheduler, base_vs_refiner_ratio, data=None):
        if data is None:
            data = {}

        data[UI.S_GENERATION_PARAMETERS] = self.create_dict(
            seed,
            image_size_preset,
            image_width,
            image_height,
            steps,
            cfg,
            sampler_preset,
            sampler_name,
            scheduler,
            base_vs_refiner_ratio,
        )

        return (data,)

```
