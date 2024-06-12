---
tags:
- ControlNet
- Image
---

# CtrlNet OpenPose Settings (JPS)
## Documentation
- Class name: `CtrlNet OpenPose Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure settings for the OpenPose algorithm within a control network, allowing users to specify parameters such as the source of the pose estimation, the strength of the pose estimation, and whether to enable or disable body, face, and hand estimations. It abstracts the complexity of OpenPose configuration into a simple, user-friendly interface.
## Input types
### Required
- **`openpose_from`**
    - Specifies the source image for OpenPose estimation, allowing selection between 'Source Image', 'Support Image', or 'Support Direct'. This choice determines the input image on which the OpenPose algorithm will be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`openpose_strength`**
    - Controls the intensity of the OpenPose estimation, with a range from 0.00 to 10.00. This parameter allows for fine-tuning the impact of pose estimation on the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`openpose_start`**
    - Defines the starting point of the OpenPose effect within the processing pipeline, allowing for precise control over when the pose estimation begins.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`openpose_end`**
    - Sets the endpoint for the OpenPose effect, enabling users to define the duration and finality of the pose estimation within the workflow.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`openpose_body`**
    - Enables or disables body estimation in the OpenPose algorithm, offering control over the inclusion of body pose data in the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`openpose_face`**
    - Allows the user to enable or disable face estimation, providing flexibility in whether facial pose data is included in the OpenPose analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`openpose_hand`**
    - Determines whether hand estimation is enabled or disabled, enabling users to decide if hand pose data should be factored into the OpenPose results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
## Output types
- **`openpose_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Outputs the configured settings for OpenPose as a tuple, ready to be used in the control network's pose estimation pipeline.
    - Python dtype: `Tuple[int, float, float, float, str, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_OpenPose_Settings:
    openposefrom = ["Source Image", "Support Image", "Support Direct"]
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "openpose_from": (s.openposefrom,),
                "openpose_strength": ("FLOAT", {"default": 1.00, "min": 0.00, "max": 10.00, "step": 0.10}),
                "openpose_start": ("FLOAT", {"default": 0.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "openpose_end": ("FLOAT", {"default": 1.000, "min": 0.000, "max": 1.000, "step": 0.05}),
                "openpose_body": (["enable","disable"],),
                "openpose_face": (["enable","disable"],),
                "openpose_hand": (["enable","disable"],),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("openpose_settings",)
    FUNCTION = "get_ctrlnet_openpose"

    CATEGORY="JPS Nodes/Settings"

    def get_ctrlnet_openpose(self, openpose_from, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand):

        openpose_source = int (1)
        if (openpose_from == "Support Image"):
            openpose_source = int(2)
        if (openpose_from == "Support Direct"):
            openpose_source = int(3)
        
        openpose_settings = openpose_source, openpose_strength, openpose_start, openpose_end, openpose_body, openpose_face, openpose_hand

        return(openpose_settings,)

```
