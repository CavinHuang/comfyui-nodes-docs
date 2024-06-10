---
tags:
- Prompt
- PromptStyling
---

# Focus Styler
## Documentation
- Class name: `FocusStyler`
- Category: `ali1234/stylers`
- Output node: `False`

FocusStyler is designed to apply specific styling effects to text prompts based on predefined templates, enhancing their descriptive quality for generating stylized images. It dynamically adjusts the input prompts according to the selected styling options, aiming to refine the visual output according to the focus theme.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled, serving as the primary input for generating stylized descriptions. Its modification is central to achieving the desired thematic focus in the visual output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, used to negate or counterbalance aspects of the image generation. Altering this prompt helps fine-tune the focus of the generated imagery.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`focus`**
    - Specifies the styling focus to be applied to the text prompts, guiding the thematic direction of the styling effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the input and output prompts for debugging or analysis purposes. Enabling this option provides insight into how the styling affects the prompts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive text prompt, reflecting the applied focus theme to guide the image generation process.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative text prompt, adjusted to complement the focus theme in negating undesired elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
