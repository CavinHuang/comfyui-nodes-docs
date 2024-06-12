---
tags:
- AnimateDiff
- Animation
---

# View Options◆Looped Uniform 🎭🅐🅓
## Documentation
- Class name: `ADE_LoopedUniformViewOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts/view opts`
- Output node: `False`

This node is designed to create view options for generating looped uniform context options in the Animate Diff framework. It configures the parameters for view length, stride, overlap, and whether the loop is closed, alongside the method for fusing context and an option to use on equal length, to tailor the generation process.
## Input types
### Required
- **`view_length`**
    - Specifies the length of the view. It determines how many frames or units are considered in a single view, affecting the granularity of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`view_stride`**
    - Defines the stride or step size between views. It affects how smoothly or rapidly the animation transitions between frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`view_overlap`**
    - Sets the overlap between consecutive views, influencing the continuity and smoothness of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`closed_loop`**
    - Indicates whether the animation should loop back to the beginning, creating a seamless loop effect.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`fuse_method`**
    - Determines the method used to fuse multiple views or contexts together, impacting the overall animation style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_on_equal_length`**
    - A flag to specify if the view options should be applied even when the animation length matches the view length, affecting the animation's versatility.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`view_opts`**
    - Comfy dtype: `VIEW_OPTS`
    - Produces the configured view options necessary for generating looped uniform context options within the Animate Diff framework.
    - Python dtype: `ContextOptions`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoopedUniformViewOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "view_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "view_stride": ("INT", {"default": 1, "min": 1, "max": STRIDE_MAX}),
                "view_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
                "closed_loop": ("BOOLEAN", {"default": False},),
            },
            "optional": {
                "fuse_method": (ContextFuseMethod.LIST,),
                "use_on_equal_length": ("BOOLEAN", {"default": False},),
            }
        }
    
    RETURN_TYPES = ("VIEW_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/context opts/view opts"
    FUNCTION = "create_options"

    def create_options(self, view_length: int, view_overlap: int, view_stride: int, closed_loop: bool,
                       fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False):
        view_options = ContextOptions(
            context_length=view_length,
            context_stride=view_stride,
            context_overlap=view_overlap,
            context_schedule=ContextSchedules.UNIFORM_LOOPED,
            closed_loop=closed_loop,
            fuse_method=fuse_method,
            use_on_equal_length=use_on_equal_length,
            )
        return (view_options,)

```
