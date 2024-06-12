---
tags:
- Image
- Style
---

# Camera_Angles Styler (Advanced)
## Documentation
- Class name: `Camera_AnglesStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The Camera_AnglesStylerAdvanced node is designed to manipulate and enhance images by adjusting their camera angles, leveraging 3D geometry and perspective transformations. This node applies complex algorithms to simulate changes in elevation and azimuth of the camera's viewpoint, aiming to achieve a more dynamic or aesthetically pleasing composition.
## Input types
### Required
- **`text_positive_g`**
    - Specifies the positive aspects to emphasize in the generated text, guiding the generation towards favorable outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - Defines the local positive attributes to be highlighted in the text, focusing on specific details or elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - Indicates the negative aspects to be minimized or avoided in the text generation, aiming to steer clear of undesirable outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`camera_angles`**
    - Controls the simulation of camera angles, including elevation and azimuth, to adjust the perspective in the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Targets specific negative prompts for transformation, aiming to convert them into a more positive or neutral context.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - Logs the prompts used for generating text, aiding in the tracking and refinement of the generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - Generates globally positive text, reflecting the overall positive outcome of the transformation.
    - Python dtype: `List[str]`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - Produces locally positive text, highlighting specific positive details or elements.
    - Python dtype: `List[str]`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - Outputs text that has been positively influenced by the specified prompts and camera angle adjustments.
    - Python dtype: `List[str]`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - Generates globally negative text, which may serve as a contrast or control to the positive outputs.
    - Python dtype: `List[str]`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - Produces locally negative text, focusing on specific negative details or elements for contrast or control purposes.
    - Python dtype: `List[str]`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - Outputs text that remains negatively influenced, serving as a baseline or control for comparison.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
