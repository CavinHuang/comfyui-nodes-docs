---
tags:
- Prompt
- PromptStyling
---

# Preposition Styler
## Documentation
- Class name: `PrepositionStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The PrepositionStyler node dynamically generates styling options for text prompts based on predefined templates and user selections. It enhances text prompts by applying stylistic modifications according to the selected options, aiming to refine the prompts for more targeted and effective generative tasks.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled. This input is crucial as it serves as the base content that will be enhanced through the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. This input complements the positive prompt by providing content that should be avoided or counteracted in the generative process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`preposition`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - A boolean flag indicating whether to log the input prompts and their styled versions for debugging or analysis purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, reflecting the applied stylistic modifications.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, reflecting the applied stylistic modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
