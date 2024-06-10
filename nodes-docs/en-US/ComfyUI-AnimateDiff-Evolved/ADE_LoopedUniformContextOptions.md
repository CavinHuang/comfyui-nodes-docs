---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Context Options◆Looped Uniform 🎭🅐🅓
## Documentation
- Class name: `ADE_LoopedUniformContextOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts`
- Output node: `False`

This node is designed to generate looped uniform context options for animation difference (AnimateDiff) processes. It facilitates the creation of context configurations that enable seamless looping and uniform distribution of context frames, enhancing the continuity and uniformity of animations.
## Input types
### Required
- **`context_length`**
    - Specifies the total length of the context to be generated. It determines the number of frames or steps that will be included in the context, directly impacting the scope of the animation's continuity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_stride`**
    - Defines the stride or step size between each context frame in the looped uniform context. It affects how densely the frames are sampled, influencing the smoothness and granularity of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_overlap`**
    - Determines the overlap between consecutive context frames in the looped uniform setup. This parameter helps in creating smoother transitions between frames by allowing them to share common elements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`closed_loop`**
    - A boolean flag indicating whether the context should form a closed loop, ensuring that the animation seamlessly loops back to the beginning.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`fuse_method`**
    - Specifies the method used to fuse multiple context frames together, affecting the blending and transition between frames in the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_on_equal_length`**
    - A boolean flag that, when true, allows the context configuration to be applied even when the number of frames equals the context length, ensuring uniformity across all scenarios.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_percent`**
    - Indicates the starting point of the animation as a percentage of the total length, allowing for precise control over the animation's initial frame.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Specifies the minimum number of steps or frames guaranteed to be included in the context, ensuring a baseline level of detail and continuity in the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - An optional parameter that allows for the inclusion of previously defined context options, enabling the chaining and layering of context configurations for complex animations.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup`
- **`view_opts`**
    - Allows for the inclusion of view-specific options, further customizing the context configuration based on specific viewing parameters.
    - Comfy dtype: `VIEW_OPTS`
    - Python dtype: `ContextOptions`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - The generated looped uniform context options, ready to be applied to AnimateDiff processes for enhanced animation continuity and uniformity.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoopedUniformContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "context_stride": ("INT", {"default": 1, "min": 1, "max": STRIDE_MAX}),
                "context_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
                "closed_loop": ("BOOLEAN", {"default": False},),
                #"sync_context_to_pe": ("BOOLEAN", {"default": False},),
            },
            "optional": {
                "fuse_method": (ContextFuseMethod.LIST,),
                "use_on_equal_length": ("BOOLEAN", {"default": False},),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
                "prev_context": ("CONTEXT_OPTIONS",),
                "view_opts": ("VIEW_OPTS",),
            }
        }
    
    RETURN_TYPES = ("CONTEXT_OPTIONS",)
    RETURN_NAMES = ("CONTEXT_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/context opts"
    FUNCTION = "create_options"

    def create_options(self, context_length: int, context_stride: int, context_overlap: int, closed_loop: bool,
                       fuse_method: str=ContextFuseMethod.FLAT, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1,
                       view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()

        context_options = ContextOptions(
            context_length=context_length,
            context_stride=context_stride,
            context_overlap=context_overlap,
            context_schedule=ContextSchedules.UNIFORM_LOOPED,
            closed_loop=closed_loop,
            fuse_method=fuse_method,
            use_on_equal_length=use_on_equal_length,
            start_percent=start_percent,
            guarantee_steps=guarantee_steps,
            view_options=view_opts,
            )
        #context_options.set_sync_context_to_pe(sync_context_to_pe)
        prev_context.add(context_options)
        return (prev_context,)

```
