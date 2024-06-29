---
tags:
- ImageEnhancement
---

# NoiseInjectionDetailerHookProvider
## Documentation
- Class name: `NoiseInjectionDetailerHookProvider`
- Category: `ImpactPack/Detailer`
- Output node: `False`

This node is designed to inject noise into the detailer process, allowing for enhanced control over the noise characteristics throughout the cycle. It leverages schedules and strength parameters to dynamically adjust the noise injection based on the cycle's progress.
## Input types
### Required
- **`schedule_for_cycle`**
    - Specifies the schedule to be used for the noise injection cycle, influencing how noise characteristics are adjusted over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`source`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`seed`**
    - A seed value for noise generation, ensuring reproducibility of the noise characteristics.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_strength`**
    - The initial strength of the noise to be injected at the beginning of the cycle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_strength`**
    - The final strength of the noise to be injected by the end of the cycle, allowing for dynamic adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Produces a detailer hook configured for noise injection, ready to be integrated into the detailer process.
    - Python dtype: `hooks.InjectNoiseHookForDetailer`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)



## Source code
```python
class NoiseInjectionDetailerHookProvider:
    schedules = ["skip_start", "from_start"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_cycle": (s.schedules,),
                     "source": (["CPU", "GPU"],),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "start_strength": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 200.0, "step": 0.01}),
                     "end_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 200.0, "step": 0.01}),
                    },
                }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, schedule_for_cycle, source, seed, start_strength, end_strength):
        try:
            hook = hooks.InjectNoiseHookForDetailer(source, seed, start_strength, end_strength,
                                                    from_start=('from_start' in schedule_for_cycle))
            return (hook, )
        except Exception as e:
            print("[ERROR] NoiseInjectionDetailerHookProvider: 'ComfyUI Noise' custom node isn't installed. You must install 'BlenderNeko/ComfyUI Noise' extension to use this node.")
            print(f"\t{e}")
            pass

```
