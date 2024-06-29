---
tags:
- Prompt
- PromptStyling
---

# Nouns Styler (Advanced)
## Documentation
- Class name: `NounsStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The NounsStylerAdvanced node dynamically enhances text prompts based on a selection of styling options, allowing for the customization of text attributes through advanced styling techniques. It leverages a comprehensive dataset to apply stylistic modifications to text inputs, aiming to refine and personalize the output based on user-selected criteria.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text to be styled, serving as a base for applying global stylistic enhancements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text to be styled, allowing for finer, more localized adjustments in text styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text input that undergoes stylistic modifications to achieve a desired negative tone or emphasis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`nouns`**
    - A list of nouns to be specifically styled or emphasized within the text, allowing for targeted stylistic enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`negative_prompt_to`**
    - Specifies the scope of negative styling application, offering options to target global, local, or both text types.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`log_prompt`**
    - Controls the logging of prompt information, aiding in debugging and refinement of styling choices.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The globally styled positive text, reflecting broad stylistic enhancements.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The locally styled positive text, showcasing detailed stylistic adjustments.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined positive text output, integrating both global and local stylistic enhancements.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The globally styled negative text, indicating overarching negative stylistic changes.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The locally styled negative text, highlighting specific negative stylistic nuances.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The overall styled negative text, amalgamating both global and local negative stylistic modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
