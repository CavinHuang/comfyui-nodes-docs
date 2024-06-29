---
tags:
- Prompt
- PromptStyling
---

# Breast_State Styler (Advanced)
## Documentation
- Class name: `Breast_StateStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The Breast_StateStylerAdvanced node is designed to apply advanced styling options to text prompts, leveraging a comprehensive set of styling parameters to enhance or modify the aesthetic and thematic elements of the input text. It abstracts complex styling operations into a user-friendly interface, allowing for detailed customization and refinement of text-based content.
## Input types
### Required
- **`text_positive_g`**
    - Represents the global positive text prompt for styling, setting the broad thematic direction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - Specifies the local positive text prompt, allowing for finer thematic adjustments within the global context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The initial negative text prompt that the node will modify to counterbalance or avoid specific themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`breast_state`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Determines how the negative styling is applied, offering options to target global, local, or both aspects of the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that enables logging of the styling process, providing insights into the selections made and the transformations applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting broad thematic enhancements.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showcasing finer adjustments within the global theme.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A composite of the global and local positive prompts, fully styled.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, modified to counterbalance or avoid specific global themes.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, addressing finer thematic elements to be avoided or counterbalanced.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - A composite of the global and local negative prompts, fully styled to avoid or counterbalance specific themes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
