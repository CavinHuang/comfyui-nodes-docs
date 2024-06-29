---
tags:
- Prompt
- PromptStyling
---

# Artist Styler (Advanced)
## Documentation
- Class name: `ArtistStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The ArtistStylerAdvanced node dynamically subclasses from SDXLPromptStylerAdvanced to apply advanced styling options to text prompts based on artist-specific styles. It leverages a comprehensive dataset of style templates to transform input prompts into artistically styled versions, enhancing creativity and specificity in text generation tasks.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, serving as a foundational element for artistic transformation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, allowing for more detailed and nuanced artistic transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, providing a basis for contrastive or negating artistic transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`artist`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Specifies the scope of the negative styling transformation, allowing choices between global, local, or both styling applications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process, offering insights into the styling decisions and outcomes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The final styled global positive text prompt.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The final styled local positive text prompt.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined final styled positive text prompt, incorporating both global and local artistic transformations.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The final styled global negative text prompt.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The final styled local negative text prompt.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined final styled negative text prompt, reflecting both global and local artistic nuances.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
