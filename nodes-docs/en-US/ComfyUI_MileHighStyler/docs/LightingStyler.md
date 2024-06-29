---
tags:
- Prompt
- PromptStyling
---

# Lighting Styler
## Documentation
- Class name: `LightingStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The LightingStyler node dynamically applies lighting adjustments to prompts, enhancing or altering their visual representation through predefined templates. It leverages a collection of lighting styles to modify the aesthetic and mood of the input prompts, aiming to achieve a specific lighting effect.
## Input types
### Required
- **`text_positive`**
    - The positive text input represents the initial prompt or image description that the node will adjust with a lighting style. It plays a crucial role in determining the final output by providing the base content that will be stylistically modified.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input serves as a counterbalance to the positive input, specifying elements or themes to avoid in the final styled prompt. It ensures that the output adheres to the desired aesthetic by excluding unwanted characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`lighting`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled positive text output reflects the application of a lighting style to the original prompt, showcasing the node's ability to enhance or alter the visual mood and aesthetic of the input.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled negative text output indicates how the original negative input has been adjusted in accordance with the applied lighting style, ensuring that the final output remains aligned with the user's aesthetic preferences.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
