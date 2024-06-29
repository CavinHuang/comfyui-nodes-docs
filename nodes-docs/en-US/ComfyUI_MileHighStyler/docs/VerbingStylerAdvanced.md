---
tags:
- Prompt
- PromptStyling
---

# Verbing Styler (Advanced)
## Documentation
- Class name: `VerbingStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node is designed for advanced styling of text prompts, utilizing a variety of styling options to modify and enhance text attributes for specific purposes. It supports both global and local adjustments to text, enabling detailed customization based on user-selected styles.
## Input types
### Required
- **`text_positive_g`**
    - Serves as the global positive text input, forming the base content for styling modifications according to selected options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - Represents the local positive text input, allowing for finer control and customization in the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - Acts as the negative text input, which can be styled to contrast or complement the positive text, depending on the styling choices.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`verbing`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Determines the scope of negative styling, directing adjustments to either global, local, or both aspects of the text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - Enables logging of the prompt information, including selections and styled text, useful for debugging or review.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The globally styled positive text, reflecting the applied styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The locally styled positive text, demonstrating the effects of detailed styling adjustments.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined positive text after global and local styling has been applied.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The globally styled negative text, altered based on the styling selections.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The locally styled negative text, showing the impact of precise styling choices.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The fully styled negative text, incorporating both global and local styling effects.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
