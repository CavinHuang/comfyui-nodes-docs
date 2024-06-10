---
tags:
- Prompt
- PromptStyling
---

# Clothing_Style Styler
## Documentation
- Class name: `Clothing_StyleStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The Clothing Style Styler node is designed to apply specific styling adjustments to text prompts based on clothing style preferences. It utilizes a predefined set of templates to modify and enhance input text prompts, aiming to reflect the desired clothing style in the generated content.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text prompt to be styled, serving as the base content for styling modifications. It plays a crucial role in determining the final styled output by providing the initial content that will be enhanced according to the selected clothing style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled, which is used to specify elements to be downplayed or avoided in the styled output. This parameter helps in refining the styling process by excluding undesired elements from the final content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clothing_style`**
    - Specifies the particular clothing style to apply to the text prompts, guiding the styling adjustments and enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether the styling process and selections should be logged, providing transparency and traceability of the styling decisions made.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, reflecting the applied clothing style adjustments.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, adjusted to exclude or minimize the specified undesired elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
