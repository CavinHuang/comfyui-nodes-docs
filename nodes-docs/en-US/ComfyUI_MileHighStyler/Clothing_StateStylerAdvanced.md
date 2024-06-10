---
tags:
- Prompt
- PromptStyling
---

# Clothing_State Styler (Advanced)
## Documentation
- Class name: `Clothing_StateStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The Clothing_StateStylerAdvanced node dynamically subclasses from SDXLPromptStylerAdvanced to provide advanced styling capabilities for text prompts related to clothing state. It utilizes a predefined set of templates to modify and enhance input text prompts based on user-selected styling options, aiming to refine the generation of text descriptions or commands in the context of clothing appearance or condition.
## Input types
### Required
- **`text_positive_g`**
    - The global positive aspect of the text prompt to be styled, focusing on broader, desirable attributes or outcomes. It's essential for defining the overall positive theme of the styled prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive aspect of the text prompt to be styled, focusing on specific, desirable attributes or outcomes. It complements the global positive prompt by adding detail and nuance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled, focusing on undesirable attributes or outcomes. It significantly influences the styling process by identifying elements to be downplayed or avoided in the final prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clothing_state`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling, whether it applies globally, locally, or both, thus directing how the negative aspects are integrated into the styled prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the original and styled prompts for debugging or review purposes. It helps in understanding the effect of styling choices on the text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global positive text prompt, enhanced according to the selected styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local positive text prompt, further refined based on styling selections.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global negative text prompt, modified to reflect the chosen styling adjustments on a broader scale.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local negative text prompt, adjusted to incorporate the selected styling effects on a more detailed level.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled version of the negative text prompts, integrating both global and local adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
