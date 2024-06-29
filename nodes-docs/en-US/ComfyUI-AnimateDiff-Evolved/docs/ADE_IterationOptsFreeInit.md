---
tags:
- AnimateDiff
- Animation
---

# FreeInit Iteration Options 🎭🅐🅓
## Documentation
- Class name: `ADE_IterationOptsFreeInit`
- Category: `Animate Diff 🎭🅐🅓/iteration opts`
- Output node: `False`

This node is designed to create iteration options for the AnimateDiff process, allowing users to customize the iteration behavior through various settings such as iteration count, batch offset, and seed offset. It encapsulates the functionality to generate and configure iteration options dynamically, facilitating the customization of the animation diffusion process.
## Input types
### Required
- **`iterations`**
    - Specifies the number of iterations for the AnimateDiff process, directly influencing the depth and detail of the animation generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filter`**
    - Defines a filter to be applied during the iteration process, affecting the selection or modification of data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`d_s`**
    - Specifies the spatial distance parameter, influencing the spatial aspects of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`d_t`**
    - Specifies the temporal distance parameter, affecting the temporal progression of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`n_butterworth`**
    - Determines the order of the Butterworth filter applied in the process, impacting the smoothness of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_step`**
    - Sets the step size for sigma adjustments, influencing the detail and quality of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`apply_to_ist_iter`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`init_type`**
    - Specifies the initialization type for the iteration process, influencing the starting conditions of the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`iter_batch_offset`**
    - Determines the starting batch offset for iterations, enabling control over the batch processing sequence in the animation generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`iter_seed_offset`**
    - Sets the seed offset for iterations, allowing for varied randomness in the animation generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`iteration_opts`**
    - Comfy dtype: `ITERATION_OPTS`
    - The generated iteration options, encapsulating settings such as iteration count, batch offset, and seed offset for the AnimateDiff process.
    - Python dtype: `IterationOptions`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FreeInitOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "iterations": ("INT", {"default": 2, "min": 1}),
                "filter": (FreeInitFilter.LIST,),
                "d_s": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.001}),
                "d_t": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.001}),
                "n_butterworth": ("INT", {"default": 4, "min": 1, "max": 100},),
                "sigma_step": ("INT", {"default": 999, "min": 1, "max": 999}),
                "apply_to_1st_iter": ("BOOLEAN", {"default": False}),
                "init_type": (FreeInitOptions.LIST,)
            },
            "optional": {
                "iter_batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "iter_seed_offset": ("INT", {"default": 1, "min": BIGMIN, "max": BIGMAX}),
            }
        }

    RETURN_TYPES = ("ITERATION_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/iteration opts"
    FUNCTION = "create_iter_opts"

    def create_iter_opts(self, iterations: int, filter: str, d_s: float, d_t: float, n_butterworth: int,
                         sigma_step: int, apply_to_1st_iter: bool, init_type: str,
                         iter_batch_offset: int=0, iter_seed_offset: int=1):
        # init_type does nothing for now, not until I add more methods of applying low+high freq noise
        iter_opts = FreeInitOptions(iterations=iterations, step=sigma_step, apply_to_1st_iter=apply_to_1st_iter,
                                    filter=filter, d_s=d_s, d_t=d_t, n=n_butterworth, init_type=init_type,
                                    iter_batch_offset=iter_batch_offset, iter_seed_offset=iter_seed_offset)
        return (iter_opts,)

```
