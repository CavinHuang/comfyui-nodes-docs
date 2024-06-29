---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Context Options◆Standard Static 🎭🅐🅓
## Documentation
- Class name: `ADE_StandardStaticContextOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts`
- Output node: `False`

This node is designed to generate a set of static context options for the Animate Diff process, providing a standardized configuration for animation generation.
## Input types
### Required
- **`context_length`**
    - Specifies the length of the context to be used in the animation, determining how many frames or steps are considered for each segment of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_overlap`**
    - Defines the overlap between consecutive contexts in the animation, affecting the smoothness and continuity between frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`fuse_method`**
    - Determines the method used to fuse multiple contexts together, influencing the final animation's fluidity and coherence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_on_equal_length`**
    - A boolean flag that specifies whether to use the fuse method when contexts are of equal length, affecting the animation's uniformity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_percent`**
    - Defines the starting point of the animation as a percentage, allowing for customization of where the animation begins within the provided context.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Ensures a minimum number of steps or frames in the animation, providing a baseline for animation smoothness and continuity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - Allows for the integration of previously defined context options, enabling the chaining or layering of context configurations for complex animations.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup`
- **`view_opts`**
    - Specifies view options for the animation, offering additional customization for how the animation is rendered and displayed.
    - Comfy dtype: `VIEW_OPTS`
    - Python dtype: `ContextOptions`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Outputs a configured set of context options tailored for static animation scenarios, ready for use in the Animate Diff process.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ADE_AnimateDiffLoaderGen1](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderGen1.md)
    - [ADE_UseEvolvedSampling](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_UseEvolvedSampling.md)



## Source code
```python
class StandardStaticContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "context_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
            },
            "optional": {
                "fuse_method": (ContextFuseMethod.LIST_STATIC,),
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

    def create_options(self, context_length: int, context_overlap: int,
                       fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1,
                       view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        
        context_options = ContextOptions(
            context_length=context_length,
            context_stride=None,
            context_overlap=context_overlap,
            context_schedule=ContextSchedules.STATIC_STANDARD,
            fuse_method=fuse_method,
            use_on_equal_length=use_on_equal_length,
            start_percent=start_percent,
            guarantee_steps=guarantee_steps,
            view_options=view_opts,
            )
        prev_context.add(context_options)
        return (prev_context,)

```
