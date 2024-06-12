---
tags:
- Prompt
- PromptStyling
---

# Luts Styler
## Documentation
- Class name: `LutsStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The LutsStyler node dynamically applies stylistic transformations to text prompts based on a selection of LUTs (Look-Up Tables) from a predefined set. It allows for the customization of text prompts through various stylistic filters, enhancing their thematic and aesthetic qualities.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled. It serves as the base content that will be transformed according to the selected LUT style, affecting the overall tone and theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. This input works alongside the positive prompt, allowing for a nuanced adjustment of the text's style by applying the selected LUT to diminish or negate certain aspects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`LUTs`**
    - The specific Look-Up Table (LUT) selections to apply to the text prompts. This input determines the stylistic filter that will be used to transform the text, directly influencing the final aesthetic and thematic output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`log_prompt`**
    - A boolean flag that controls the logging of prompt transformations. When enabled, it provides visibility into the styling process by outputting the original and transformed prompts, aiding in debugging and refinement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The transformed positive text prompt, styled according to the selected LUT. It reflects the stylistic adjustments made, showcasing the enhanced thematic and aesthetic qualities.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The transformed negative text prompt, styled with the selected LUT. This output highlights the nuanced adjustments made to the text's style, complementing the positive prompt's transformation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
