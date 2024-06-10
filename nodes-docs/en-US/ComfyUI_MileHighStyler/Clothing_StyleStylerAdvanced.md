---
tags:
- Prompt
- PromptStyling
---

# Clothing_Style Styler (Advanced)
## Documentation
- Class name: `Clothing_StyleStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

This node specializes in applying advanced styling techniques to text prompts related to clothing style, utilizing a selection of predefined templates to enhance or modify the original text based on user-selected styling options. It allows for detailed customization through various styling parameters, enabling users to fine-tune the appearance and tone of their text prompts.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, focusing on clothing style. It serves as the base content for global styling modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, focusing on clothing style. It serves as the base content for local styling modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, focusing on clothing style. It serves as the base content for styling modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clothing_style`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative prompt styling, allowing selection between global, local, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt transformation process, providing insights into the styling effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global positive text prompt, reflecting the applied clothing style modifications.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local positive text prompt, reflecting the applied clothing style modifications.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled version of the positive text prompt, integrating both global and local modifications.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global negative text prompt, reflecting the applied clothing style modifications.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local negative text prompt, reflecting the applied clothing style modifications.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled version of the negative text prompt, integrating both global and local modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
