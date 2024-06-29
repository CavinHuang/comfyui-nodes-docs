---
tags:
- Prompt
- PromptStyling
---

# Focus Styler (Advanced)
## Documentation
- Class name: `FocusStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

SDXLPromptStylerAdvanced enhances text prompts through advanced styling techniques, allowing for intricate customization of both positive and negative prompts. It introduces a nuanced layer of styling by incorporating global and local contexts, enabling users to fine-tune their text prompts with greater specificity.
## Input types
### Required
- **`text_positive_g`**
    - Serves as the global context for the positive text prompt, providing a broad thematic foundation for styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - Represents the local context for the positive text prompt, allowing for detailed customization within the global theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, which can be tailored to contrast or complement the positive prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`focus`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Determines how the negative styling is applied, specifying whether adjustments affect the global, local, or both aspects of the negative prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - When true, logs the details of the styling process, offering insights into the selections made and their effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting the applied styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showcasing the effects of granular adjustments.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A composite of the global and local positive prompts, styled and merged according to the specified options.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, adjusted based on the negative_prompt_to parameter.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, tailored according to the negative_prompt_to parameter.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The overall styled negative prompt, incorporating both global and local adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
