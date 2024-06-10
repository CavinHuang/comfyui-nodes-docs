---
tags:
- Prompt
- PromptStyling
---

# Luts Styler (Advanced)
## Documentation
- Class name: `LutsStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The LutsStylerAdvanced node dynamically subclasses from SDXLPromptStylerAdvanced to provide advanced styling capabilities for text prompts. It utilizes a collection of predefined styles, each associated with a unique menu option, to modify and enhance text inputs based on user selections. This node aims to offer a more sophisticated level of text prompt styling, allowing for intricate adjustments and customizations beyond basic text transformations.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text input to be styled, representing the broader context or theme to be enhanced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text input to be styled, focusing on specific details or elements within the broader context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input to be styled, intended for text that the user wishes to contrast with the positive inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`LUTs`**
    - The selection of Look-Up Tables (LUTs) for styling the text prompts, representing the specific style to be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`negative_prompt_to`**
    - Specifies the target for negative styling, allowing selection between global, local, or both contexts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process, providing insights into the selections made and their effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global positive text input.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local positive text input.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled version of both global and local positive text inputs.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global negative text input.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local negative text input.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled version of the negative text inputs, transformed according to the selected styling options.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
