---
tags:
- Prompt
- PromptStyling
---

# Filter Styler (Advanced)
## Documentation
- Class name: `FilterStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node applies advanced styling to text prompts through a combination of user-selected options, enhancing or modifying the original prompts to achieve desired aesthetic or thematic effects. It supports a dynamic selection of styling options, allowing for a high degree of customization in the styling process.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, serving as part of the base content for styling transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, working alongside the global prompt to refine the thematic direction of the styled text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, used to specify content that should be avoided or contrasted against in the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filter`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling application, whether it affects global, local, or both types of prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - When enabled, logs the original and styled prompts along with the user's menu selections, aiding in debugging and understanding the impact of selected styles.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global positive text prompt.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local positive text prompt.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A combined styled version of the global and local positive text prompts.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled version of the global negative text prompt, if applicable based on the 'negative_prompt_to' selection.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled version of the local negative text prompt, if applicable based on the 'negative_prompt_to' selection.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, showcasing the effects of the applied filters in contrast or avoidance to the original content.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
