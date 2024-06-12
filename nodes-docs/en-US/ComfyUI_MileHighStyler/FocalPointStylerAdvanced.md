---
tags:
- Prompt
- PromptStyling
---

# Focal Point Styler (Advanced)
## Documentation
- Class name: `FocalPointStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The SDXLPromptStyler node is designed to apply advanced styling options to text prompts, utilizing a dynamic subclassing mechanism from a base node. It incorporates user-selected styles from a predefined menu, leveraging a dataset of styling templates to modify and enhance text prompts. This node aims to refine the generation of images or text outputs by applying specific stylistic adjustments, based on both global and local text prompt modifications.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, serving as one of the primary inputs for styling adjustments. Its modification influences the thematic direction and visual characteristics of the generated output on a global scale.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, serving as another primary input for styling adjustments. Its modification influences the thematic direction and visual characteristics of the generated output on a local scale.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, used to specify undesired elements or themes in the output. Altering this prompt helps in fine-tuning the generation process by excluding specific characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`focal point`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative prompt styling, allowing selection between global only, local only, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag indicating whether to log the input and output prompts for debugging or analysis purposes. Enabling this option provides insights into the styling process and its effects on the prompts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The modified global positive text prompt, reflecting the applied stylistic adjustments.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The modified local positive text prompt, reflecting the applied stylistic adjustments.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined modified positive text prompt, integrating both global and local adjustments.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The modified global negative text prompt, adjusted to more effectively exclude undesired elements or themes from the generated output.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The modified local negative text prompt, adjusted to more effectively exclude undesired elements or themes from the generated output.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined modified negative text prompt, integrating both global and local adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
