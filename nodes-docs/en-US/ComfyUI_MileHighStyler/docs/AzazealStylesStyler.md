---
tags:
- Prompt
- PromptStyling
---

# Azazeal Styles Styler
## Documentation
- Class name: `AzazealStylesStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The AzazealStylesStyler node dynamically applies a specific aesthetic or thematic style to text prompts based on a selection from predefined styles. It enhances the original text prompts by incorporating stylistic elements, aiming to achieve a more targeted or nuanced expression.
## Input types
### Required
- **`text_positive`**
    - The original positive text prompt to be styled. It serves as the base content that will be enhanced with the selected style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The original negative text prompt to be styled. It acts as a counterpoint to the positive prompt, both of which will be modified according to the chosen style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Azazeal Styles`**
    - Specifies the particular style to apply to the text prompts, chosen from a predefined list of styles. This selection determines the stylistic adjustments made to the prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when true, enables logging of the prompt styling process for debugging or verification purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The positive text prompt after being styled, reflecting the intended thematic enhancements.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The negative text prompt after styling, showcasing the applied aesthetic or thematic elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
