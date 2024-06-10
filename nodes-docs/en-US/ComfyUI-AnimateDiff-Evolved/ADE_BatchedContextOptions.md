---
tags:
- AnimateDiff
- Animation
---

# Context Options◆Batched [Non-AD] 🎭🅐🅓
## Documentation
- Class name: `ADE_BatchedContextOptions`
- Category: `Animate Diff 🎭🅐🅓/context opts`
- Output node: `False`

This node is designed to create and manage batched context options for Animate Diff operations. It allows for the customization of context length, start percentage, and guaranteed steps, with the option to inherit and modify previous context settings. This facilitates the efficient handling of context in batched processing scenarios, optimizing the animation and diffing processes by adjusting context parameters dynamically.
## Input types
### Required
- **`context_length`**
    - Specifies the length of the context to be used in the batched processing. This parameter is crucial for defining the scope of the context over which the animation and diff operations are applied, directly influencing the granularity and precision of the process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`start_percent`**
    - Determines the starting point of the context as a percentage of the total length. This allows for fine-tuning the initial position of the context window, enabling more precise control over the animation and diffing operations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Defines the minimum number of steps guaranteed within the context. This parameter ensures that a certain level of detail and smoothness is maintained in the animation and diffing processes, regardless of the context length or start position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prev_context`**
    - Allows for the inheritance and modification of previously defined context options. This facilitates the reuse and adaptation of context settings, promoting efficiency and consistency across batched processing tasks.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `ContextOptionsGroup`
## Output types
- **`CONTEXT_OPTS`**
    - Comfy dtype: `CONTEXT_OPTIONS`
    - The modified or newly created batched context options, ready to be utilized in subsequent Animate Diff operations. This encapsulates all the specified parameters, providing a tailored context setup for optimized batch processing.
    - Python dtype: `ContextOptionsGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchedContextOptionsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "context_length": ("INT", {"default": 16, "min": 1, "max": LENGTH_MAX}),
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

    def create_options(self, context_length: int, start_percent: float=0.0, guarantee_steps: int=1,
                       prev_context: ContextOptionsGroup=None):
        if prev_context is None:
            prev_context = ContextOptionsGroup()
        prev_context = prev_context.clone()
        
        context_options = ContextOptions(
            context_length=context_length,
            context_overlap=0,
            context_schedule=ContextSchedules.BATCHED,
            start_percent=start_percent,
            guarantee_steps=guarantee_steps,
            )
        prev_context.add(context_options)
        return (prev_context,)

```
