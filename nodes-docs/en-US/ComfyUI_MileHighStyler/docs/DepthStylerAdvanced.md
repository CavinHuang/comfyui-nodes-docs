---
tags:
- Prompt
- PromptStyling
---

# Depth Styler (Advanced)
## Documentation
- Class name: `DepthStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node is designed for advanced styling of text prompts, enabling customization through a variety of styling options. It allows for the modification of both positive and negative aspects of prompts, supporting detailed adjustments to enhance the overall impact and effectiveness of the generated content.
## Input types
### Required
- **`text_positive_g`**
    - Represents the global positive aspects of the text prompt, focusing on broad, overarching positive themes or elements to be emphasized in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - Captures the local positive aspects of the text prompt, detailing specific positive elements or details to be highlighted.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - This input captures the negative aspects or elements the user wants to minimize or avoid in the generated content, ensuring the styling adjustments counteract these undesired features.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`depth`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative prompt adjustments, allowing users to target either global, local, or both aspects for negative styling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the original and styled prompts along with the user's selections for each menu, providing insight into how the styling choices influence the final output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The enhanced global positive text prompt, styled to emphasize overarching positive themes more effectively.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The enhanced local positive text prompt, styled to highlight specific positive details more effectively.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined global and local positive aspects of the text prompt, styled to emphasize both broad themes and specific details more effectively.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The adjusted global negative text prompt, modified to further suppress or negate undesired overarching negative elements.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The adjusted local negative text prompt, modified to further suppress or negate undesired specific negative details.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined global and local negative aspects of the text prompt, adjusted to suppress or negate both broad themes and specific details more effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
