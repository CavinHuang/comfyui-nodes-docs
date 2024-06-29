---
tags:
- AnimationScheduling
- Scheduling
---

# Prompt Schedule NodeFlow 📅🅕🅝
## Documentation
- Class name: `PromptScheduleNodeFlow`
- Category: `FizzNodes 📅🅕🅝/ScheduleNodes`
- Output node: `False`

This node is designed to dynamically construct and manipulate JSON strings based on input text and numerical parameters, facilitating the scheduling of content in a structured format. It primarily serves to augment input text with additional context or parameters, thereby enabling more complex or conditional content generation workflows.
## Input types
### Required
- **`text`**
    - The primary text input that will be included in the constructed JSON string, serving as the main content or subject of the scheduling operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`num_frames`**
    - A numerical parameter that specifies the starting point for the scheduling operation, affecting the key under which the new content will be placed in the JSON structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`in_text`**
    - An optional initial JSON string to which the new content will be appended, allowing for incremental construction of complex JSON structures.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_frames`**
    - A numerical parameter that, when combined with 'num_frames', determines the key for the new content in the JSON structure, influencing the scheduling sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The new maximum frame count, derived from the input 'num_frames' and 'max_frames', indicating the next available key in the JSON structure.
    - Python dtype: `int`
- **`string`**
    - Comfy dtype: `STRING`
    - The newly constructed JSON string, containing the scheduled content with keys based on the input parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptScheduleNodeFlow:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": True}),                           
                            "num_frames": ("INT", {"default": 24.0, "min": 0.0, "max": 9999.0, "step": 1.0}),},
               "optional":  {"in_text": ("STRING", {"multiline": False, }), # "forceInput": True}),
                             "max_frames": ("INT", {"default": 0.0, "min": 0.0, "max": 999999.0, "step": 1.0,})}}
    
    RETURN_TYPES = ("INT","STRING",)
    FUNCTION = "addString"
    CATEGORY = "FizzNodes 📅🅕🅝/ScheduleNodes"

    def addString(self, text, in_text='', max_frames=0, num_frames=0):
        if in_text:
            # Remove trailing comma from in_text if it exists
            in_text = in_text.rstrip(',')

        new_max = num_frames + max_frames

        if max_frames == 0:
            # Construct a new JSON object with a single key-value pair
            new_text = in_text + (', ' if in_text else '') + f'"{max_frames}": "{text}"'
        else:
            # Construct a new JSON object with a single key-value pair
            new_text = in_text + (', ' if in_text else '') + f'"{new_max}": "{text}"'



        return (new_max, new_text,)

```
