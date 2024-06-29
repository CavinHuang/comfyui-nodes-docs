---
tags:
- Prompt
- PromptStyling
---

# Mood Styler (Advanced)
## Documentation
- Class name: `MoodStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The MoodStylerAdvanced node is designed to enhance and stylize text prompts based on mood selections, offering advanced customization options for generating or modifying text in a way that reflects specific mood attributes. It leverages a comprehensive dataset of styles to apply nuanced changes to both positive and negative prompts, enabling users to tailor the mood of their generated content with precision.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text to be styled, serving as a base for mood-based enhancements. It plays a crucial role in defining the overall positive tone of the content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text to be styled, allowing for fine-grained mood adjustments on a more specific level than the global positive text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text to be styled, which is transformed to reflect the selected mood in a manner that contrasts with the positive text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mood`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the target mood for the negative text, guiding the transformation process to achieve the desired mood contrast.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the input and output prompts along with the selected mood styles for debugging or review purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The global positive text after mood-based styling, reflecting the selected mood enhancements.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The local positive text after mood-based styling, showcasing the applied fine-grained mood adjustments.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A combined version of the styled positive text, incorporating both global and local enhancements.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The global negative text after mood-based styling, contrasting with the positive text by reflecting a different or opposing mood.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The local negative text after mood-based styling, providing detailed mood contrasts on a more specific level.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - A combined version of the styled negative text, incorporating both global and local mood-based transformations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
