---
tags:
- Prompt
- PromptStyling
---

# Banana_Styles Styler
## Documentation
- Class name: `Banana_StylesStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The Banana Styles Styler node dynamically applies a variety of styling options to text prompts based on user-selected styles from a predefined set. It enhances or modifies the original text prompts to reflect specific aesthetic or thematic choices, leveraging a collection of templates for customization.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled. It serves as the base content that will be enhanced or modified according to the selected styling options, impacting the overall thematic or aesthetic output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. This input works alongside the positive prompt, allowing for a nuanced approach to styling by potentially contrasting or complementing the positive prompt's modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`banana_styles`**
    - A selection of styling options available for the user to apply to the text prompts. This parameter allows for the customization of the text's appearance, reflecting the chosen aesthetic or thematic style.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the original and styled prompts along with the user's menu selections. This aids in debugging and understanding the impact of selected styles on the text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, reflecting the applied styling options.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, showcasing the modifications made based on the selected styles.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
