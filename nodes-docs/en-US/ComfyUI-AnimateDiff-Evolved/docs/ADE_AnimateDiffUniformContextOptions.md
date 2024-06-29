---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Context Options◆Looped Uniform 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffUniformContextOptions`
- Category: ``
- Output node: `False`

This node is designed to generate context options for the AnimateDiff process, focusing on creating a looped uniform context. It allows for the customization of context parameters such as length, stride, and overlap, and supports the configuration of looped animations with options for closed loops and fusion methods. It's aimed at enhancing the flexibility and control over the animation generation process in AnimateDiff.
## Input types
### Required
- **`context_length`**
    - Specifies the length of the context to be generated. It's crucial for defining the scope of the animation sequence and affects the overall animation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_stride`**
    - Defines the stride between each context in the sequence, affecting the smoothness and speed of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_overlap`**
    - Sets the amount of overlap between contexts, influencing the continuity and fluidity of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_schedule`**
    - Determines the scheduling method for the context, impacting the structure and timing of the animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`closed_loop`**
    - Indicates whether the animation should loop back to the beginning, creating a seamless loop effect.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`fuse_method`**
    - Specifies the method for fusing contexts, affecting the blending and transition between animation frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_on_equal_length`**
    - Determines whether to use the context options when the length of all contexts is equal, optimizing for specific animation scenarios.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_percent`**
    - Determines the starting point of the animation as a percentage of the total length. This parameter allows for fine-tuning the initial phase of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Ensures a minimum number of steps in the animation, providing a baseline for the animation's complexity and duration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - Allows for the inclusion of previously defined context options, enabling the chaining and layering of animation contexts for more complex animations.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup`
- **`view_opts`**
    - Allows for the specification of view options, further customizing the visual aspects of the animation.
    - Comfy dtype: `VIEW_OPTS`
    - Python dtype: `ContextOptions`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Generates a set of context options tailored for looped uniform animations in AnimateDiff, enhancing the control and customization of the animation process.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)



## Source code
```python
class LegacyLoopedUniformContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "context_stride": ("INT", {"default": 1, "min": 1, "max": STRIDE_MAX}),
                "context_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
                "context_schedule": (ContextSchedules.LEGACY_UNIFORM_SCHEDULE_LIST,),
                "closed_loop": ("BOOLEAN", {"default": False},),
                #"sync_context_to_pe": ("BOOLEAN", {"default": False},),
            },
            "optional": {
                "fuse_method": (ContextFuseMethod.LIST, {"default": ContextFuseMethod.FLAT}),
                "use_on_equal_length": ("BOOLEAN", {"default": False},),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
                "prev_context": ("CONTEXT_OPTIONS",),
                "view_opts": ("VIEW_OPTS",),
            }
        }
    
    RETURN_TYPES = ("CONTEXT_OPTIONS",)
    RETURN_NAMES = ("CONTEXT_OPTS",)
    CATEGORY = ""  # No Category, so will not appear in menu
    FUNCTION = "create_options"

    def create_options(self, fuse_method: str=ContextFuseMethod.FLAT, context_schedule: str=None, **kwargs):
        return LoopedUniformContextOptionsNode.create_options(self, fuse_method=fuse_method, **kwargs)

```
