---
tags:
- Prompt
- PromptStyling
---

# Environment Styler (Advanced)
## Documentation
- Class name: `EnvironmentStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The EnvironmentStylerAdvanced node dynamically subclasses from SDXLPromptStylerAdvanced to provide advanced styling capabilities for text prompts based on environmental themes. It utilizes a predefined set of templates to modify and enhance input text prompts, aiming to reflect specific environmental characteristics or themes within the generated content.
## Input types
### Required
- **`text_positive_g`**
    - The global aspect of the positive text prompt to be styled, focusing on enhancing its environmental thematic elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local aspect of the positive text prompt to be styled, aiming to emphasize specific environmental details.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text prompt to be styled, aiming to mitigate or remove undesired environmental elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`environment`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling to be applied, whether globally, locally, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process, providing insights into the selections made and their impact on the styled prompts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, enriched with environmental themes.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, emphasizing specific environmental details.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text prompt, integrating both global and local environmental enhancements.
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
    - The combined styled negative text prompt, reflecting the mitigation or removal of undesired environmental elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
