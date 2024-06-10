---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# Context Options◆Views Only [VRAM⇈] 🎭🅐🅓
## Documentation
- Class name: `ADE_ViewsOnlyContextOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts`
- Output node: `False`

This node is designed to create context options specifically tailored for viewing animations, incorporating parameters such as start percentage and guarantee steps to customize the animation's initiation and progression.
## Input types
### Required
- **`view_opts_req`**
    - Specifies the required view options to tailor the context for viewing animations, ensuring the animation's parameters are set according to the provided view options.
    - Comfy dtype: `VIEW_OPTS`
    - Python dtype: `ContextOptions`
### Optional
- **`start_percent`**
    - Determines the starting point of the animation as a percentage, allowing for precise control over where the animation begins.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Specifies the minimum number of steps guaranteed in the animation, ensuring a certain length and progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - Allows for the inclusion of previous context options, enabling the chaining or layering of context configurations for complex animations.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup or None`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Provides the modified context options group, enriched with the newly created context options for viewing animations.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ViewAsContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "view_opts_req": ("VIEW_OPTS",),
            },
            "optional": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
                "prev_context": ("CONTEXT_OPTIONS",),
            }
        }
    
    RETURN_TYPES = ("CONTEXT_OPTIONS",)
    RETURN_NAMES = ("CONTEXT_OPTS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/context opts"
    FUNCTION = "create_options"

    def create_options(self, view_opts_req: ContextOptions, start_percent: float=0.0, guarantee_steps: int=1,
                       prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        context_options = ContextOptions(
            context_schedule=ContextSchedules.VIEW_AS_CONTEXT,
            start_percent=start_percent,
            guarantee_steps=guarantee_steps,
            view_options=view_opts_req,
            use_on_equal_length=True
        )
        prev_context.add(context_options)
        return (prev_context,)

```
