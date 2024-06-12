---
tags:
- Prompt
- PromptStyling
---

# Composition Styler
## Documentation
- Class name: `CompositionStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The CompositionStyler node dynamically applies styling to text prompts based on a selection of composition-related styles. It utilizes a predefined set of templates to modify and enhance the input text prompts, aiming to achieve a specific compositional aesthetic or effect.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text prompt to be styled. It plays a crucial role in determining the overall tone and direction of the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled. It's used to contrast or negate certain elements of the positive prompt, contributing to a more nuanced and balanced output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`composition`**
    - Specifies the composition-related style to apply to the text prompts. This selection influences the styling process, tailoring the output to achieve the desired compositional effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether the prompt styling process should be logged. This aids in debugging and understanding how the selected styles are applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, reflecting the applied compositional styles.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, showcasing the effects of the applied styles in contrast or negation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
