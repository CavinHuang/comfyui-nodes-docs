---
tags:
- AnimateDiff
- Animation
---

# View Options◆Standard Static 🎭🅐🅓
## Documentation
- Class name: `ADE_StandardStaticViewOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts/view opts`
- Output node: `False`

This node is designed to create static view options for the Animate Diff process, allowing for the customization of view length and overlap with optional fuse method adjustments.
## Input types
### Required
- **`view_length`**
    - Specifies the length of the view, affecting the granularity of the animation frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`view_overlap`**
    - Determines the overlap between consecutive views, influencing the smoothness of the animation transition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`fuse_method`**
    - Optional parameter that defines the method for fusing context, offering flexibility in the animation's visual continuity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`view_opts`**
    - Comfy dtype: `VIEW_OPTS`
    - Outputs the configured view options, ready to be utilized in the Animate Diff process.
    - Python dtype: `ContextOptions`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StandardStaticViewOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "view_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "view_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
            },
            "optional": {
                "fuse_method": (ContextFuseMethod.LIST,),
            }
        }
    
    RETURN_TYPES = ("VIEW_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/context opts/view opts"
    FUNCTION = "create_options"

    def create_options(self, view_length: int, view_overlap: int,
                       fuse_method: str=ContextFuseMethod.FLAT,):
        view_options = ContextOptions(
            context_length=view_length,
            context_stride=None,
            context_overlap=view_overlap,
            context_schedule=ContextSchedules.STATIC_STANDARD,
            fuse_method=fuse_method,
            )
        return (view_options,)

```
