---
tags:
- Prompt
- PromptStyling
---

# Adjective Styler
## Documentation
- Class name: `AdjectiveStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The AdjectiveStyler node dynamically customizes text prompts based on a selection of stylistic adjectives, allowing users to enhance or modify the tone and characteristics of their text inputs through a menu-driven interface.
## Input types
### Required
- **`text_positive`**
    - Defines the initial positive text prompt to be styled. It serves as the base content that will be modified according to the selected stylistic adjectives.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - Defines the initial negative text prompt to be styled. It serves as the base content that will be modified according to the selected stylistic adjectives.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`adjective`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - Controls whether the styling process and selections are logged, aiding in debugging or review of the styling choices made.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The modified positive text prompt, styled according to the selected adjectives.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The modified negative text prompt, styled according to the selected adjectives.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
