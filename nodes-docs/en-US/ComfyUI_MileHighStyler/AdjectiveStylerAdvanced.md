---
tags:
- Prompt
- PromptStyling
---

# Adjective Styler (Advanced)
## Documentation
- Class name: `AdjectiveStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The AdjectiveStylerAdvanced node dynamically applies stylistic transformations to text inputs based on a selection of adjectives, enhancing or altering the tone, mood, or descriptive quality of the text. It leverages a collection of predefined templates to modify text inputs according to user-selected stylistic preferences, aiming to achieve a specific aesthetic or thematic effect.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text to be styled, affecting the overall positive tone or content of the input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text to be styled, targeting specific positive aspects or details within the input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text to be styled, focusing on altering or enhancing negative elements or tones within the input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`adjective`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`negative_prompt_to`**
    - Determines the scope of negative text transformation, allowing customization of which parts of the text (global, local, or both) are to be styled.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt styling process, providing insights into the selections and transformations applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text, reflecting the applied stylistic transformations.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text, showcasing the specific stylistic enhancements made.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - A composite of styled positive text, combining global and local transformations for a cohesive effect.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text, indicating the stylistic changes applied to the overall negative tone or content.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text, highlighting the stylistic alterations made to specific negative details or aspects.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The fully styled negative text, incorporating both global and local stylistic transformations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
