---
tags:
- Prompt
- PromptStyling
---

# Azazeal Styles Styler (Advanced)
## Documentation
- Class name: `AzazealStylesStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The AzazealStylesStylerAdvanced node is designed to apply advanced styling to text prompts based on a selection of styles from the Azazeal styles menu. It enhances text inputs with stylistic modifications, aiming to tailor the output to specific aesthetic or thematic preferences.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled. It serves as the base content for applying global stylistic transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled. It is used for applying local stylistic adjustments, complementing the global styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. This input is modified to reflect the selected styles in a manner that negates or contrasts with the positive prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Azazeal Styles`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of negative styling application, allowing for targeted adjustments to either global, local, or both types of prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the input and output prompts along with the selected styles for debugging or review purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting the applied Azazeal styles.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showcasing the local stylistic enhancements.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A composite styled positive text prompt, integrating both global and local stylistic modifications.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, altered to contrast with the styled positive prompts.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, providing a nuanced contrast to the positive styling.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - A comprehensive styled negative text prompt, incorporating both global and local stylistic contrasts.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
