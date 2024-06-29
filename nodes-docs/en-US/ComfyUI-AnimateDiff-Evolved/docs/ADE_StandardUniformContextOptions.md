---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Context Options◆Standard Uniform 🎭🅐🅓
## Documentation
- Class name: `ADE_StandardUniformContextOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts`
- Output node: `False`

This node is designed to create a uniform set of context options for animation difference processing, allowing for the customization of context length, start percentage, and guaranteed steps within the animation sequence. It supports the integration of previous context configurations to build upon existing settings.
## Input types
### Required
- **`context_length`**
    - Specifies the length of the context for the animation difference processing, influencing the granularity and scope of the animation sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_stride`**
    - Determines the stride between each context in the sequence, affecting the overlap and transition smoothness between animation frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_overlap`**
    - Defines the amount of overlap between contexts, which can influence the continuity and smoothness of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`fuse_method`**
    - Specifies the method used to fuse multiple contexts together, impacting the final animation's visual coherence.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_on_equal_length`**
    - Indicates whether the context options should be applied uniformly across animations of equal length, affecting consistency in animation processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`start_percent`**
    - Determines the starting point of the animation as a percentage, allowing for precise control over the initiation of the animation sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Defines the minimum number of steps guaranteed within the animation, ensuring a certain level of detail and smoothness in the animation sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - Allows for the inclusion of previous context configurations, enabling the accumulation and refinement of context settings over time.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup`
- **`view_opts`**
    - Allows for the specification of view options, further customizing the context configuration for animation processing.
    - Comfy dtype: `VIEW_OPTS`
    - Python dtype: `ContextOptions`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Produces a set of context options tailored for uniform animation difference processing, encapsulating the specified configurations.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ADE_UseEvolvedSampling](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_UseEvolvedSampling.md)



## Source code
```python
class StandardUniformContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
                "context_stride": ("INT", {"default": 1, "min": 1, "max": STRIDE_MAX}),
                "context_overlap": ("INT", {"default": 4, "min": 0, "max": OVERLAP_MAX}),
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

    def create_options(self, context_length: int, context_stride: int, context_overlap: int,
                       fuse_method: str=ContextFuseMethod.PYRAMID, use_on_equal_length=False, start_percent: float=0.0, guarantee_steps: int=1,
                       view_opts: ContextOptions=None, prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()

        context_options = ContextOptions(
            context_length=context_length,
            context_stride=context_stride,
            context_overlap=context_overlap,
            context_schedule=ContextSchedules.UNIFORM_STANDARD,
            closed_loop=False,
            fuse_method=fuse_method,
            use_on_equal_length=use_on_equal_length,
            start_percent=start_percent,
            guarantee_steps=guarantee_steps,
            view_options=view_opts,
            )
        prev_context.add(context_options)
        return (prev_context,)

```
