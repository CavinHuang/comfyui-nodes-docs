---
tags:
- Image
- Style
---

# Face Styler
## Documentation
- Class name: `FaceStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The FaceStyler node is designed to apply specific styling effects to facial features within images, leveraging a collection of predefined styles to enhance or alter the appearance of faces according to user-selected options.
## Input types
### Required
- **`text_positive`**
    - Specifies the positive textual content that influences the styling process, contributing to the generation of styled facial features within the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - Specifies the negative textual content that influences the styling process, counteracting certain styles or features in the generation of styled facial images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`face`**
    - The input image containing the face(s) to be styled, serving as the direct subject for the application of styling effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Image`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the styling choices and textual content inputs for debugging or informational purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The output text reflecting the positive styling effects applied.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The output text reflecting the negative styling effects applied.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
