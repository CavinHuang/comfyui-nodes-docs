---
tags:
- ImageEnhancement
- Scheduling
---

# UnsamplerDetailerHookProvider
## Documentation
- Class name: `UnsamplerDetailerHookProvider`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The UnsamplerDetailerHookProvider node is designed to provide hooks that modify the sampling process in image generation tasks. It focuses on adjusting the unsampling behavior, which is a critical step in refining the details and quality of generated images.
## Input types
### Required
- **`model`**
    - Specifies the model used in the unsampling process, serving as the foundation for generating images.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`steps`**
    - Determines the number of steps in the unsampling process, affecting the level of detail and refinement in the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_end_at_step`**
    - Defines the starting point for the end step in the unsampling process, influencing the progression of image refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_end_at_step`**
    - Specifies the ending point for the end step in the unsampling process, further refining the progression of image detail enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Sets the configuration for the unsampling process, impacting the overall quality and characteristics of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Indicates the sampler used in the unsampling process, affecting the method of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling strategy for the unsampling process, influencing the timing and sequence of image refinement steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalize`**
    - Specifies whether to normalize the output of the unsampling process, affecting the consistency and quality of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`positive`**
    - Defines positive conditioning factors for the unsampling process, guiding the generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Sets negative conditioning factors for the unsampling process, steering the generation away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`schedule_for_cycle`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Produces a detailer hook configured according to the specified unsampling parameters, ready to be integrated into the image generation pipeline.
    - Python dtype: `DetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnsamplerDetailerHookProvider:
    schedules = ["skip_start", "from_start"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "steps": ("INT", {"default": 25, "min": 1, "max": 10000}),
                     "start_end_at_step": ("INT", {"default": 21, "min": 0, "max": 10000}),
                     "end_end_at_step": ("INT", {"default": 24, "min": 0, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                     "normalize": (["disable", "enable"], ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "schedule_for_cycle": (s.schedules,),
                     }}

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name,
             scheduler, normalize, positive, negative, schedule_for_cycle):
        try:
            hook = hooks.UnsamplerDetailerHook(model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name,
                                               scheduler, normalize, positive, negative,
                                               from_start=('from_start' in schedule_for_cycle))

            return (hook, )
        except Exception as e:
            print("[ERROR] UnsamplerDetailerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f"\t{e}")
            pass

```
