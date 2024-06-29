---
tags:
- Image
- Style
---

# Camera_Angles Styler
## Documentation
- Class name: `Camera_AnglesStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The Camera_AnglesStyler node is designed to manipulate and style 3D model representations by adjusting camera angles, including elevation and azimuth. It leverages deep learning models to encode visual and spatial information, enabling the generation of conditioned outputs that reflect the specified camera perspectives.
## Input types
### Required
- **`text_positive`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`text_negative`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`camera_angles`**
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
    - Represents the conditioned output with applied camera angle adjustments, reflecting the specified elevation and azimuth in a positive context.
    - Python dtype: `list`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - Provides a baseline or control output without the applied camera angle adjustments, serving for comparison or as a negative context.
    - Python dtype: `list`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
