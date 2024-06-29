---
tags:
- ImageEnhancement
---

# NoiseInjectionHookProvider
## Documentation
- Class name: `NoiseInjectionHookProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The NoiseInjectionHookProvider node is designed to inject noise into a given input based on a specified schedule, source, and strength parameters. It aims to enhance or alter the characteristics of the input by applying noise, which can be useful in various image and signal processing tasks to simulate real-world conditions or to introduce variability.
## Input types
### Required
- **`schedule_for_iteration`**
    - Specifies the schedule to be used for noise injection, affecting how noise is applied over iterations. It plays a crucial role in determining the pattern and intensity of noise injection throughout the process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`source`**
    - Indicates the source of the noise to be injected, which can be either CPU or GPU generated noise, affecting the characteristics of the noise.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the noise pattern when the same seed is used.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_strength`**
    - The initial strength of the noise to be injected, influencing the intensity of the noise at the beginning of the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_strength`**
    - The final strength of the noise to be injected, determining the intensity of the noise at the end of the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - The output is a hook that conditions the input by injecting noise according to the specified parameters.
    - Python dtype: `Tuple[InjectNoiseHook]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NoiseInjectionHookProvider:
    schedules = ["simple"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_iteration": (s.schedules,),
                     "source": (["CPU", "GPU"],),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "start_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 200.0, "step": 0.01}),
                     "end_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 200.0, "step": 0.01}),
                    },
                }

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, schedule_for_iteration, source, seed, start_strength, end_strength):
        try:
            hook = None
            if schedule_for_iteration == "simple":
                hook = hooks.InjectNoiseHook(source, seed, start_strength, end_strength)

            return (hook, )
        except Exception as e:
            print("[ERROR] NoiseInjectionHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f"\t{e}")
            pass

```
