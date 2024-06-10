---
tags:
- Prompt
- PromptStyling
---

# Perfection Styler (Advanced)
## Documentation
- Class name: `PerfectionStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The PerfectionStylerAdvanced node dynamically enhances text prompts based on a predefined set of stylistic parameters, excluding specific styles like 'artist' and 'milehigh'. It allows for the customization of text prompts through a variety of stylistic filters such as camera, composition, depth, and more, aiming to refine and perfect the generated content.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, serving as the foundational content for stylistic enhancement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, allowing for finer control over the stylistic direction of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, used to guide the generation away from undesired themes or styles.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`camera`**
    - Applies camera-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`composition`**
    - Applies composition-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`depth`**
    - Applies depth-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`environment`**
    - Applies environment-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filter`**
    - Applies filter-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`focus`**
    - Applies focus-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lighting`**
    - Applies lighting-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mood`**
    - Applies mood-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`subject`**
    - Applies subject-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`theme`**
    - Applies theme-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`timeofday`**
    - Applies time-of-day-related stylistic enhancements to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling, whether it applies globally, locally, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `['Both', 'G only', 'L only']`
- **`log_prompt`**
    - A flag to enable logging of the input and styled prompts, facilitating debugging and refinement of the styling process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The enhanced global positive text prompt, stylistically modified.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The enhanced local positive text prompt, stylistically modified.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined enhanced positive text prompt, integrating both global and local modifications.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The enhanced global negative text prompt, stylistically modified to guide generation away from undesired elements.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The enhanced local negative text prompt, providing finer control over the avoidance of certain elements.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined enhanced negative text prompt, integrating both global and local modifications.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
