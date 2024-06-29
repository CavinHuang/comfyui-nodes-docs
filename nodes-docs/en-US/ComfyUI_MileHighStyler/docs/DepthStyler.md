---
tags:
- Prompt
- PromptStyling
---

# Depth Styler
## Documentation
- Class name: `DepthStyler`
- Category: `ali1234/stylers`
- Output node: `False`

SDXLPromptStyler is designed to stylize text prompts by applying various predefined styles, allowing for the customization of positive and negative aspects of prompts. It supports dynamic selection of styles through menus, enabling users to tailor the prompt's tone and content for specific generative tasks.
## Input types
### Required
- **`text_positive`**
    - The positive prompt text to be styled. It serves as the base content for customization, aiming to enhance or specify desired elements in the generated output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative prompt text to be styled. It guides the model to avoid certain elements or themes, serving as a counterbalance to the positive prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`depth`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt transformations and selections. Useful for debugging or tracking how changes to the prompt affect the styling process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive prompt text, modified according to the selected styles to emphasize or specify desired elements.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative prompt text, adjusted to ensure certain elements or themes are avoided in the generated output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
