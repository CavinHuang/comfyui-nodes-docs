---
tags:
- RandomGeneration
- Seed
---

# Time Seed (JPS)
## Documentation
- Class name: `Time Seed (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

The Time Seed node generates a unique seed value based on the current time, optionally allowing for a fixed seed to be specified. This functionality is crucial for ensuring reproducibility in processes that require randomization, by providing a way to initialize random number generators with a consistent starting point.
## Input types
### Required
- **`fixed_seed`**
    - Specifies a fixed seed value to be used instead of generating one based on the current time. If set to 0, a time-based seed is generated, ensuring variability with each execution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `INT`
    - The generated seed value, which is either based on the current time or the specified fixed seed, used for initializing random number generators.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Time_Seed:
#    time_format = ["%Y%m%d%H%M%S","%Y%m%d%H%M","%Y%m%d","%Y-%m-%d-%H_%M_%S","%Y-%m-%d-%H_%M","%Y-%m-%d","%Y-%m-%d %H_%M_%S","%Y-%m-%d %H_%M","%Y-%m-%d","%H%M","%H%M%S","%H_%M","%H_%M_%S"]
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "fixed_seed": ("INT", {"default": 0, "min": 0, "max": 99999999999, "step": 1}),
            }
        }
    
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    FUNCTION = "get_seed"

    CATEGORY = "JPS Nodes/Text"

    def get_seed(self, fixed_seed):
        now = datetime.now()
        time = now.strftime("%Y%m%d%H%M%S")
        seed_out = int(time) + np.random.randint(999999)
        if fixed_seed != 0:
            seed_out=fixed_seed

        return (int(seed_out),)

    @classmethod
    def IS_CHANGED(s, seed_out):
        now = datetime.now()
        forceupdate = now.strftime("%Y%m%d%H%M%S")
        forceupdate = forceupdate + np.random.randint(99999999) + seed_out
        return (forceupdate,)

```
