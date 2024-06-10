---
tags:
- Prompt
- PromptStyling
---

# Subject Styler
## Documentation
- Class name: `SubjectStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The SubjectStyler node dynamically applies thematic styling to text prompts based on a predefined set of styles related to 'subject' themes. It enhances text prompts by incorporating subject-specific stylistic elements, aiming to achieve a more targeted and refined generation of content.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text prompt to be styled. It plays a crucial role in guiding the styling process towards enhancing the desired thematic elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled. It is used to counterbalance or avoid certain themes, ensuring the styling remains focused on the desired subject matter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subject`**
    - The specific subject theme to apply during the styling process. This parameter determines the thematic direction and stylistic adjustments to be made to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the styling process details. This aids in debugging and understanding how the selected subject theme influences the final styled prompts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive aspect of the text prompt, reflecting the applied subject theme.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative aspect of the text prompt, also influenced by the selected subject theme.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
