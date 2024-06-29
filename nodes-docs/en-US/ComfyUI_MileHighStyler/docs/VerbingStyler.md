---
tags:
- Prompt
- PromptStyling
---

# Verbing Styler
## Documentation
- Class name: `VerbingStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The VerbingStyler node dynamically applies stylistic transformations to text inputs based on a selection of styling options defined in its menus. It allows for the customization of text prompts through the application of predefined templates, enhancing the expressiveness and thematic depth of the generated content.
## Input types
### Required
- **`text_positive`**
    - The positive text to be styled, serving as the base content for stylistic transformations, impacting the overall thematic presentation of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text to be styled, transformed according to the selected styling options, altering its thematic and expressive qualities.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`verbing`**
    - Specifies the styling options to be applied, allowing for customization and thematic adjustments to the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `dict`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the styling selections and the before-and-after states of the text, aiding in debugging and refinement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive text, reflecting the applied stylistic transformations.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The fully styled negative text, encapsulating the thematic and expressive alterations resulting from the styling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
