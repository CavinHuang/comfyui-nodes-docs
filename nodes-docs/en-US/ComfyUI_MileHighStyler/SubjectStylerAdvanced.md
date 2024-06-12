---
tags:
- Prompt
- PromptStyling
---

# Subject Styler (Advanced)
## Documentation
- Class name: `SubjectStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SubjectStylerAdvanced node is designed to apply advanced styling options to text prompts based on a selection of subject-related styles. It allows for the customization of positive and negative prompts through a variety of subject-specific templates, enhancing the generation of styled text for creative and descriptive purposes.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled. It serves as the base content for applying subject-specific styling transformations, affecting the overall thematic presentation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled. This parameter allows for finer control over the styling applied to specific parts of the positive prompt, contributing to a more nuanced and detailed output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. It is used to specify content that should be contrasted with or excluded from the positive prompts, guiding the styling process to avoid certain themes or elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subject`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies how the negative prompt styling should be applied: to both global and local positive prompts, only to the global prompt, or only to the local prompt. This choice allows for targeted styling adjustments based on the desired outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`log_prompt`**
    - A boolean flag indicating whether to log the input and styled prompts for debugging or review purposes. Enabling this option provides transparency into the styling process and the effects of selected templates.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting the applied subject-specific styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showcasing the nuanced styling effects on specific parts of the prompt.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - An additional styled positive text prompt, offering another layer of creative styling output.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, indicating how negative themes or elements have been artistically integrated or excluded.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, providing insight into the detailed exclusion or alteration of negative elements in specific parts of the prompt.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The fully styled negative text prompt, demonstrating the comprehensive application of subject-specific styling to avoid or contrast certain themes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
