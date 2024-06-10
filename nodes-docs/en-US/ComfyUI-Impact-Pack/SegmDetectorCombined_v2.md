---
tags:
- Image
- Segmentation
---

# SEGM Detector (combined)
## Documentation
- Class name: `SegmDetectorCombined_v2`
- Category: `ImpactPack/Detector`
- Output node: `False`

The SegmDetectorCombined_v2 node is designed for image segmentation tasks, combining detection and segmentation processes to output a mask representing the segmented areas of the input image. It abstracts the complexity of underlying segmentation models and detection algorithms, providing a streamlined interface for generating segmentation masks.
## Input types
### Required
- **`segm_detector`**
    - The segmentation detector model used for detecting and segmenting objects within the image. It plays a crucial role in the overall segmentation process.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `object`
- **`image`**
    - The input image to be processed for segmentation. The image is analyzed to identify and segment relevant objects or areas.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - A threshold value used to determine the sensitivity of the segmentation detection. It influences the segmentation outcome by filtering out detections below this threshold.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dilation`**
    - Specifies the dilation level applied to the segmentation masks, affecting the mask's boundary smoothness and size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output segmentation mask, indicating the segmented areas of the input image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SegmDetectorCombined:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segm_detector": ("SEGM_DETECTOR", ),
                        "image": ("IMAGE", ),
                        "threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                        "dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                      }
                }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detector"

    def doit(self, segm_detector, image, threshold, dilation):
        mask = segm_detector.detect_combined(image, threshold, dilation)

        if mask is None:
            mask = torch.zeros((image.shape[2], image.shape[1]), dtype=torch.float32, device="cpu")

        return (mask.unsqueeze(0),)

```
