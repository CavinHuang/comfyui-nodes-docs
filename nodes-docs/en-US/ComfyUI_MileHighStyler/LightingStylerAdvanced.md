---
tags:
- Prompt
- PromptStyling
---

# Lighting Styler (Advanced)
## Documentation
- Class name: `LightingStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node is designed to dynamically apply stylistic modifications to text prompts, utilizing a variety of predefined styles to enhance or alter the textual content. It supports advanced styling options, allowing for detailed customization of both positive and negative prompts based on user-defined criteria. This node aims to facilitate the creation of highly customized text prompts that can be used to guide generative models more effectively.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled. This input serves as the base content for global stylistic enhancements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled. This input is used for local or specific stylistic enhancements within the text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt that specifies elements to be excluded or negated in the styling process. This input is crucial for refining the output by indicating undesired content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`lighting`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative prompt's application, whether it affects global, local, or both aspects of the text styling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - Indicates whether to log the input prompts and the styled outputs for debugging or analytical purposes, aiding in the evaluation of the styling effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting the applied global stylistic modifications.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showing the effects of local stylistic enhancements.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text prompt, integrating both global and local stylistic modifications.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled negative text prompt, integrating modifications based on the negative prompt inputs.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
