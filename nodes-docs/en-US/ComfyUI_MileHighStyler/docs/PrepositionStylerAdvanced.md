---
tags:
- Prompt
- PromptStyling
---

# Preposition Styler (Advanced)
## Documentation
- Class name: `PrepositionStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node offers advanced styling capabilities for text inputs, utilizing a variety of stylistic templates to modify and enhance text based on user-selected options. It aims to improve the expressiveness and thematic depth of text through sophisticated stylistic transformations.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text input to be styled, serving as one of the foundational elements for stylistic enhancement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text input to be styled, providing additional detail and nuance to the global positive text for a more refined styling outcome.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input to be styled, offering a counterpoint to the positive text inputs and allowing for a balanced and nuanced text transformation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`preposition`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Controls the scope of negative styling applied, whether to global, local, or both text inputs, further customizing the styling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that enables the logging of input and output texts along with the selected menu options, aiding in debugging and process transparency.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text output, transformed according to the selected stylistic templates and inputs.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text output, providing detailed stylistic enhancements in conjunction with the global positive text.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text output, merging global and local enhancements for a comprehensive stylistic transformation.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text output, offering a stylistic contrast to the positive text outputs.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text output, adding depth and nuance to the global negative styling.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled negative text output, incorporating both global and local negative stylistic modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
