---
tags:
- AnimateDiff
- Animation
---

# Default Iteration Options 🎭🅐🅓
## Documentation
- Class name: `ADE_IterationOptsDefault`
- Category: `Animate Diff 🎭🅐🅓/iteration opts`
- Output node: `False`

This node provides the default iteration options for the AnimateDiff process, allowing users to configure the iteration parameters for their animation generation tasks.
## Input types
### Required
- **`iterations`**
    - Specifies the number of iterations to perform, affecting the depth of the animation generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`iter_batch_offset`**
    - Determines the starting offset for batch processing within the iterations, enabling fine-tuned control over the animation generation sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`iter_seed_offset`**
    - Sets the seed offset for iterations, offering a way to influence the randomness and variation in the generated animations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`iteration_opts`**
    - Comfy dtype: `ITERATION_OPTS`
    - Outputs the configured iteration options, encapsulating the settings for the animation generation process.
    - Python dtype: `IterationOptions`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IterationOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "iterations": ("INT", {"default": 1, "min": 1}),
            },
            "optional": {
                "iter_batch_offset": ("INT", {"default": 0, "min": 0, "max": BIGMAX}),
                "iter_seed_offset": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX}),
            }
        }

    RETURN_TYPES = ("ITERATION_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/iteration opts"
    FUNCTION = "create_iter_opts"

    def create_iter_opts(self, iterations: int, iter_batch_offset: int=0, iter_seed_offset: int=0):
        iter_opts = IterationOptions(iterations=iterations, iter_batch_offset=iter_batch_offset, iter_seed_offset=iter_seed_offset)
        return (iter_opts,)

```
