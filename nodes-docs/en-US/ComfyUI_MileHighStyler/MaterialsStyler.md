---
tags:
- Prompt
- PromptStyling
---

# Materials Styler
## Documentation
- Class name: `MaterialsStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The MaterialsStyler node dynamically applies styling to text prompts based on a selection of material-themed templates. It allows users to enhance or modify the aesthetic and thematic aspects of their prompts by incorporating material-specific styles, aiming to achieve a more targeted and refined output.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text prompt to be styled. It plays a crucial role in determining the overall positive tone and theme of the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled. It is essential for defining the elements to be downplayed or avoided in the styled output, contributing to a more nuanced result.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`materials`**
    - Specifies the material-themed template to apply to the text prompts. This selection is central to customizing the styling process, directly influencing the aesthetic and thematic outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the prompt styling process. Enabling this option provides transparency and insight into the styling decisions made.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive aspect of the text prompt, reflecting the applied material-themed styling.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative aspect of the text prompt, showcasing the adjustments made to downplay or avoid certain elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
