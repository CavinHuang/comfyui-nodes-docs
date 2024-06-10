---
tags:
- Prompt
- PromptStyling
---

# Clothing_State Styler
## Documentation
- Class name: `Clothing_StateStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The Clothing StateStyler node dynamically applies styling to text prompts based on predefined templates for clothing states. It utilizes a collection of styling templates to modify and enhance text inputs, aiming to reflect specific clothing styles or states in the generated text.
## Input types
### Required
- **`text_positive`**
    - The positive text input to be styled, representing text that should be enhanced or modified according to the clothing state styling templates.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input to be styled, representing text that might be altered or influenced negatively by the clothing state styling templates.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clothing_state`**
    - Specifies the particular clothing state to apply to the text prompts, guiding the styling process to reflect specific clothing styles or conditions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the input and output prompts for debugging or tracking purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive text output, modified according to the selected clothing state styling template.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative text output, altered to reflect the influence of the clothing state styling template.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
