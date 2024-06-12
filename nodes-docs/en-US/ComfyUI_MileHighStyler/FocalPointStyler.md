---
tags:
- Prompt
- PromptStyling
---

# Focal Point Styler
## Documentation
- Class name: `FocalPointStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The FocalPointStyler node dynamically customizes text prompts based on a selection of stylistic elements, allowing for the enhancement or alteration of focal points within the generated content. It leverages a collection of predefined templates to apply stylistic modifications, aiming to refine the focus and thematic emphasis of the input text.
## Input types
### Required
- **`text_positive`**
    - The positive aspect of the text to be styled, serving as the primary content for stylistic enhancement. It plays a crucial role in determining the overall thematic direction and focus of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative aspect of the text to be styled, which is used to counterbalance or provide contrast to the positive text. This input helps in fine-tuning the thematic focus and depth of the styled output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`focal point`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The enhanced version of the positive text, styled according to the selected stylistic elements. It reflects the applied modifications, showcasing the node's ability to refine and focus the thematic content.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The enhanced version of the negative text, styled to complement the positive text's thematic focus. It demonstrates the node's capability to balance and enrich the overall content through stylistic alterations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
