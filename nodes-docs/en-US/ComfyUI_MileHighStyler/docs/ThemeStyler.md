---
tags:
- Prompt
- PromptStyling
---

# Theme Styler
## Documentation
- Class name: `ThemeStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The ThemeStyler node dynamically applies thematic styling to text prompts based on a selection from predefined themes. It modifies the input text to reflect the chosen theme, enhancing the prompt's expressiveness and specificity for generating styled content.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text prompt to be styled. It influences the thematic direction and tone of the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled. It serves to refine and contrast the thematic styling applied, ensuring balanced and nuanced output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`theme`**
    - The specific theme selected to style the text prompt. This choice dictates the thematic elements and characteristics infused into the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`log_prompt`**
    - A flag to enable or disable logging of the prompt styling process, aiding in debugging and refinement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive aspect of the text prompt, transformed to embody the selected theme.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative aspect of the text prompt, adjusted to complement the thematic styling of the positive text.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
