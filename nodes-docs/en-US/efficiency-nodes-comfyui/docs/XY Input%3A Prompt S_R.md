---
tags:
- Prompt
---

# XY Input: Prompt S/R
## Documentation
- Class name: `XY Input: Prompt S_R`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to facilitate the search and replace functionality within prompts, specifically targeting the enhancement or modification of text inputs for efficiency in processing. It operates by dynamically adjusting the content of prompts based on specified search and replace criteria, thereby optimizing the generation or refinement of text outputs.
## Input types
### Required
- **`target_prompt`**
    - Specifies whether the prompt to be modified is positive or negative, directly influencing the type of modification applied to the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`search_txt`**
    - The text string to be searched for within the prompt, serving as the basis for the replacement operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace_count`**
    - Indicates the number of times the search text should be replaced, affecting the extent of modification.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`replace_i`**
    - Dynamic inputs representing the replacement text for each occurrence of the search text, allowing for varied modifications across multiple instances.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs the modified prompt text, reflecting either positive or negative modifications as specified by the input criteria.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_PromptSR:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "target_prompt": (["positive", "negative"],),
                "search_txt": ("STRING", {"default": "", "multiline": False}),
                "replace_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM-1}),
            }
        }

        # Dynamically add replace_X inputs
        for i in range(1, XYPLOT_LIM):
            replace_key = f"replace_{i}"
            inputs["required"][replace_key] = ("STRING", {"default": "", "multiline": False})

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_prompt, search_txt, replace_count, **kwargs):
        if search_txt == "":
            return (None,)

        if target_prompt == "positive":
            xy_type = "Positive Prompt S/R"
        elif target_prompt == "negative":
            xy_type = "Negative Prompt S/R"

        # Create base entry
        xy_values = [(search_txt, None)]

        if replace_count > 0:
            # Append additional entries based on replace_count
            xy_values.extend([(search_txt, kwargs.get(f"replace_{i+1}")) for i in range(replace_count)])

        return ((xy_type, xy_values),)

```
