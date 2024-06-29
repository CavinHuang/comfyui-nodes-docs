---
tags:
- Prompt
---

# XY Inputs: PromptSR //EasyUse
## Documentation
- Class name: `easy XYInputs: PromptSR`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

The PromptSR node specializes in processing textual prompts by adjusting or generating new prompts based on specified sentiments, positive or negative. It leverages search text, replacement text, and conditions to dynamically create or modify prompts, aiming for a more targeted and nuanced prompt engineering approach.
## Input types
### Required
- **`target_prompt`**
    - Determines the sentiment direction for prompt adjustment or generation, influencing the outcome towards either positive or negative sentiment.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`search_txt`**
    - Text used for searching within prompts, enabling specific themes or content to be targeted for refinement or generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace_all_text`**
    - A boolean flag indicating whether all instances of the search text should be replaced in the prompt.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`replace_count`**
    - Specifies the number of replacements to be made, allowing for controlled modifications of the prompt.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`replace_i`**
    - Dynamic inputs for replacement text, where 'i' can range from 1 to the value specified by 'replace_count', facilitating specific text replacements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Generates a prompt categorized under 'X' or 'Y', based on the sentiment direction specified by the target prompt, with detailed modifications reflecting the input conditions.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_PromptSR:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "target_prompt": (["positive", "negative"],),
                "search_txt": ("STRING", {"default": "", "multiline": False}),
                "replace_all_text": ("BOOLEAN", {"default": False}),
                "replace_count": ("INT", {"default": 3, "min": 1, "max": 30 - 1}),
            }
        }

        # Dynamically add replace_X inputs
        for i in range(1, 30):
            replace_key = f"replace_{i}"
            inputs["required"][replace_key] = ("STRING", {"default": "", "multiline": False, "placeholder": replace_key})

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, target_prompt, search_txt, replace_all_text, replace_count, **kwargs):
        axis = None

        if target_prompt == "positive":
            axis = "advanced: Positive Prompt S/R"
        elif target_prompt == "negative":
            axis = "advanced: Negative Prompt S/R"

        # Create base entry
        values = [(search_txt, None, replace_all_text)]

        if replace_count > 0:
            # Append additional entries based on replace_count
            values.extend([(search_txt, kwargs.get(f"replace_{i+1}"), replace_all_text) for i in range(replace_count)])
        return ({"axis": axis, "values": values},) if values is not None else (None,)

```
