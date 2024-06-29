---
tags:
- Prompt
- PromptStyling
---

# Milehigh Styler (Advanced)
## Documentation
- Class name: `MilehighStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The MilehighStylerAdvanced node dynamically subclasses from a base styler class to provide advanced styling options for text prompts. It leverages a comprehensive dataset of styling templates to apply specific aesthetic or thematic modifications to text inputs, enhancing their descriptive quality or altering their mood and tone.
## Input types
### Required
- **`text_positive_g`**
    - A global positive text prompt intended for enhancement or modification through the node's styling capabilities. It serves as a foundational element for applying global styling themes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - A local positive text prompt that complements the global prompt by allowing for more detailed or specific styling adjustments. It enables finer control over the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - A negative text prompt that the node uses to apply inverse styling effects, aiming to negate or diminish certain aspects of the text. This input is essential for creating contrast or focus in the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`milehigh`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling application, whether it affects global, local, or both aspects of the text prompts. This choice influences how the negative styling is integrated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process. Enabling logging provides insights into the selections made and the resulting styled prompts, offering transparency and aiding in the evaluation of the styling effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The enhanced version of the global positive text prompt after applying the node's advanced styling options.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The modified version of the local positive text prompt, reflecting specific styling adjustments made.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The modified version of the global negative text prompt, showcasing the effects of inverse styling applied on a global scale.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The modified version of the local negative text prompt, showcasing the effects of inverse styling applied on a local scale.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled version of the negative text prompts, reflecting the overall inverse styling effect.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
