---
tags:
- Prompt
- PromptStyling
---

# Nouns Styler
## Documentation
- Class name: `NounsStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The NounsStyler node dynamically customizes text prompts based on a selection of stylistic themes, such as camera, composition, and mood, among others. It allows for the enhancement or modification of text inputs with predefined styles, aiming to achieve a specific aesthetic or thematic effect.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text to be styled. It plays a crucial role in determining the overall tone and direction of the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text to be styled. It is used to contrast or negate certain elements of the text, contributing to a more nuanced and balanced output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`nouns`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - A boolean flag indicating whether the styling process and choices should be logged. This aids in transparency and debugging of the styling process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text input, reflecting the selected stylistic themes.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text input, complementing the positive text with thematic consistency.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
