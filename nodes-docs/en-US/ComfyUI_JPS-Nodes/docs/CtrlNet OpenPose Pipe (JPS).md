---
tags:
- ControlNet
- Image
---

# CtrlNet OpenPose Pipe (JPS)
## Documentation
- Class name: `CtrlNet OpenPose Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The CtrlNet OpenPose Pipe node is designed to process and apply OpenPose settings to input data, facilitating the configuration and application of OpenPose parameters for pose estimation tasks. It abstracts the complexity of setting up OpenPose configurations, making it easier to integrate pose estimation into broader workflows.
## Input types
### Required
- **`openpose_settings`**
    - Specifies the configuration settings for OpenPose, including source, strength, start, end, and options for body, face, and hand detection. Each setting plays a critical role in tailoring the OpenPose algorithm's behavior, affecting the accuracy and focus of pose estimation. For instance, the source determines where the OpenPose algorithm will be applied (e.g., main or support images), strength adjusts the intensity of pose detection, and the options for body, face, and hand detection enable specific aspects of the pose to be emphasized or ignored, depending on the requirements of the task.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, float, float, float, str, str, str]`
## Output types
- **`openpose_source`**
    - Comfy dtype: `INT`
    - Identifies the source of the input for OpenPose processing.
    - Python dtype: `int`
- **`openpose_strength`**
    - Comfy dtype: `FLOAT`
    - Defines the strength of the OpenPose effect.
    - Python dtype: `float`
- **`openpose_start`**
    - Comfy dtype: `FLOAT`
    - Specifies the start point of the OpenPose effect.
    - Python dtype: `float`
- **`openpose_end`**
    - Comfy dtype: `FLOAT`
    - Specifies the end point of the OpenPose effect.
    - Python dtype: `float`
- **`openpose_body`**
    - Comfy dtype: `COMBO[STRING]`
    - Enables or disables body detection in OpenPose.
    - Python dtype: `str`
- **`openpose_face`**
    - Comfy dtype: `COMBO[STRING]`
    - Enables or disables face detection in OpenPose.
    - Python dtype: `str`
- **`openpose_hand`**
    - Comfy dtype: `COMBO[STRING]`
    - Enables or disables hand detection in OpenPose.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_OpenPose_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "openpose_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", ["enable","disable"], ["enable","disable"], ["enable","disable"],)
    RETURN_NAMES = ("openpose_source", "openpose_strength", "openpose_start", "openpose_end", "openpose_body", "openpose_face", "openpose_hand",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,openpose_settings):
        
        openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand = openpose_settings

        return(openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand,)

```
