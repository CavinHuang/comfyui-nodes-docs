---
tags:
- Prompt
- PromptStyling
---

# Composition Styler (Advanced)
## Documentation
- Class name: `CompositionStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The CompositionStylerAdvanced node dynamically subclasses from SDXLPromptStylerAdvanced to provide advanced styling capabilities for text prompts based on composition. It utilizes a predefined set of menus to apply specific stylistic transformations to both positive and negative text prompts, enhancing their thematic and aesthetic qualities.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, offering a broader context for the styling process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, focusing on more specific or detailed aspects of the composition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`composition`**
    - The selection from the composition menu to apply specific stylistic transformations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`negative_prompt_to`**
    - Controls where the negative styling is applied, with options to target global, local, or both aspects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process. This aids in debugging and understanding the transformations applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, transformed according to the selected composition styles.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, reflecting detailed composition-based stylistic enhancements.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text prompt, integrating both global and local transformations.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, modified according to the negative styling direction.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, showcasing specific negative stylistic changes.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled negative text prompt, incorporating both global and local negative transformations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
