---
tags:
- Image
- Segmentation
---

# CLIPSegDetectorProvider
## Documentation
- Class name: `CLIPSegDetectorProvider`
- Category: `ImpactPack/Util`
- Output node: `False`

The CLIPSegDetectorProvider node is designed to leverage the capabilities of CLIPSeg for object detection within images. It processes textual descriptions and image characteristics to identify and delineate objects, utilizing parameters such as blur, threshold, and dilation factor to refine the detection process.
## Input types
### Required
- **`text`**
    - The textual description of the object to be detected. This parameter is crucial for guiding the CLIPSeg model in identifying the relevant objects within the image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`blur`**
    - Specifies the level of blur applied to the image before detection. This can help in reducing noise and improving the accuracy of object detection.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`threshold`**
    - A threshold value that determines the sensitivity of object detection. Higher values may result in fewer detections, while lower values can increase the detection of minor features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation_factor`**
    - Determines the extent to which the detected object's boundaries are expanded or contracted. This can be useful in adjusting the preciseness of the object's outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`bbox_detector`**
    - Comfy dtype: `BBOX_DETECTOR`
    - Provides an object detector based on the CLIPSeg model, capable of identifying and bounding objects within images based on textual descriptions.
    - Python dtype: `core.BBoxDetectorBasedOnCLIPSeg`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPSegDetectorProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "text": ("STRING", {"multiline": False}),
                        "blur": ("FLOAT", {"min": 0, "max": 15, "step": 0.1, "default": 7}),
                        "threshold": ("FLOAT", {"min": 0, "max": 1, "step": 0.05, "default": 0.4}),
                        "dilation_factor": ("INT", {"min": 0, "max": 10, "step": 1, "default": 4}),
                    }
                }

    RETURN_TYPES = ("BBOX_DETECTOR", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, text, blur, threshold, dilation_factor):
        if "CLIPSeg" in nodes.NODE_CLASS_MAPPINGS:
            return (core.BBoxDetectorBasedOnCLIPSeg(text, blur, threshold, dilation_factor), )
        else:
            print("[ERROR] CLIPSegToBboxDetector: CLIPSeg custom node isn't installed. You must install biegert/ComfyUI-CLIPSeg extension to use this node.")

```
