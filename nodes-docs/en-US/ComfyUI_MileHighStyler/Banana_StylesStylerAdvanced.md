---
tags:
- Prompt
- PromptStyling
---

# Banana_Styles Styler (Advanced)
## Documentation
- Class name: `Banana_StylesStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

This node specializes in applying advanced styling options to text prompts based on a selection of styles related to 'Banana Styles'. It dynamically generates styling options from a predefined dataset, allowing users to enhance or modify text prompts with specific aesthetic or thematic characteristics associated with 'Banana Styles'.
## Input types
### Required
- **`text_positive_g`**
    - The global positive aspect of the text prompt to be styled, serving as part of the base content for styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive aspect of the text prompt to be styled, complementing the global positive text to refine the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled, working alongside the positive text to ensure balanced application of 'Banana Styles' characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`banana_styles`**
    - Specifies the particular 'Banana Styles' to apply, allowing for customization of the styling process based on user selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Specifies the scope of negative styling application, whether to global, local, or both aspects of the text prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the input and output prompts along with the selected 'Banana Styles' for debugging or review purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, enhanced with 'Banana Styles' characteristics.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, similarly enhanced with 'Banana Styles' characteristics.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text prompt, incorporating both global and local enhancements.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, reflecting 'Banana Styles' thematic adjustments.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, also reflecting 'Banana Styles' thematic adjustments.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled negative text prompt, incorporating both global and local adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
