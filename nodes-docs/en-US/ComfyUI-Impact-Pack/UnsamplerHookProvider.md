---
tags:
- ImageEnhancement
- Scheduling
---

# UnsamplerHookProvider
## Documentation
- Class name: `UnsamplerHookProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The UnsamplerHookProvider node is designed to create and manage UnsamplerHook instances, which are specialized hooks for adjusting the sampling process based on dynamic step calculations. This node plays a crucial role in customizing the sampling behavior, particularly in modifying the end step of the sampling process dynamically, to achieve desired effects or optimizations in image generation tasks.
## Input types
### Required
- **`model`**
    - The model parameter represents the generative model to be used for sampling. It is crucial for defining the behavior and capabilities of the UnsamplerHook, as the hook will operate based on the characteristics and functionalities of this model.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`steps`**
    - Specifies the total number of steps to be used in the sampling process. This parameter is essential for determining the duration and granularity of the sampling operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_end_at_step`**
    - Defines the initial step at which the end step adjustment begins. This parameter is key to controlling when the dynamic modification of the sampling process starts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_end_at_step`**
    - Indicates the final step at which the end step adjustment concludes. This parameter helps in fine-tuning the end of the dynamic sampling modification period.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The configuration setting for the sampling process. It influences the behavior of the UnsamplerHook by providing specific configuration values.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler to be used. This parameter identifies which sampling algorithm the UnsamplerHook will apply during the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler to be used in conjunction with the sampler. The scheduler manages the progression of steps during the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalize`**
    - A boolean flag indicating whether to normalize the samples during the sampling process. Normalization can affect the quality and characteristics of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`positive`**
    - A parameter that influences the sampling process by adjusting the positive aspects of the generated samples. It's part of the customization options provided by the UnsamplerHook.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `float`
- **`negative`**
    - A parameter that influences the sampling process by adjusting the negative aspects of the generated samples. It's part of the customization options provided by the UnsamplerHook.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `float`
- **`schedule_for_iteration`**
    - Specifies the scheduling strategy for iteration within the sampling process. This parameter determines how the UnsamplerHook dynamically adjusts the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - Returns an instance of UnsamplerHook, which is a specialized hook for dynamically adjusting the sampling process based on the provided parameters.
    - Python dtype: `UnsamplerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnsamplerHookProvider:
    schedules = ["simple"]

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
                     "schedule_for_iteration": (s.schedules,),
                     }}

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name,
             scheduler, normalize, positive, negative, schedule_for_iteration):
        try:
            hook = None
            if schedule_for_iteration == "simple":
                hook = hooks.UnsamplerHook(model, steps, start_end_at_step, end_end_at_step, cfg, sampler_name,
                                           scheduler, normalize, positive, negative)

            return (hook, )
        except Exception as e:
            print("[ERROR] UnsamplerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f"\t{e}")
            pass

```
