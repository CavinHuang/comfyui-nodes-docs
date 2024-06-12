---
tags:
- Prompt
- PromptStyling
---

# Materials Styler (Advanced)
## Documentation
- Class name: `MaterialsStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The MaterialsStylerAdvanced node is designed to apply advanced styling options to text prompts, focusing on material aspects. It dynamically adjusts the text based on a selection of material-related styles, enhancing the prompt's descriptive quality with more nuanced and specific material characteristics.
## Input types
### Required
- **`text_positive_g`**
    - The global positive aspect of the text to be styled, contributing to the overall thematic direction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive aspect of the text, offering detailed enhancements within the global context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text to be styled. It serves to balance or contrast the positive aspects, contributing to a more nuanced and comprehensive styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`materials`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Determines how the negative styling is applied, whether globally, locally, or both, affecting the styling outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the choices made during the styling process along with the original and styled text, aiding in debugging and refinement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global positive text, reflecting the chosen material characteristics.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local positive text, detailed according to the selected material nuances.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled version of both global and local positive texts, offering a comprehensive enhancement.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global negative text, adjusted based on the styling preferences.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local negative text, providing detailed contrast to the positive aspects.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled version of both global and local negative texts, contributing to a balanced and nuanced output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
