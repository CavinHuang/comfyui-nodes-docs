---
tags:
- Prompt
- PromptStyling
---

# Timeofday Styler (Advanced)
## Documentation
- Class name: `TimeofdayStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node is designed for advanced styling of text prompts through customizable templates and selections. It dynamically adjusts text prompts based on user-defined styles and preferences, enabling the creation of nuanced and contextually relevant text outputs.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, representing the broad thematic input that will be modified according to the selected styling options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, representing more specific or detailed thematic input that will be modified alongside the global prompt according to the selected styling options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, serving as an input that will be modified in contrast to the positive prompts, based on the selected styling options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timeofday`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling application, whether it affects global, local, or both types of prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A flag to enable logging of the input and output prompts for debugging or analysis purposes, providing insights into how the styling adjustments are applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, modified to reflect the selected styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, modified to reflect the selected styling options.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A combined styled positive text prompt, integrating both global and local modifications.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, modified to reflect the selected styling options for negative prompts.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, modified to reflect the selected styling options for negative prompts.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - A combined styled negative text prompt, integrating both global and local modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
