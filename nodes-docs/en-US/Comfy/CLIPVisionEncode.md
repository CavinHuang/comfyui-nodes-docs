---
tags:
- CLIP
- Loader
- ModelIO
---

# CLIP Vision Encode
## Documentation
- Class name: `CLIPVisionEncode`
- Category: `conditioning`
- Output node: `False`

The CLIPVisionEncode node is designed to encode images using a CLIP vision model, transforming visual input into a format suitable for further processing or analysis. This node abstracts the complexity of image encoding, offering a streamlined interface for converting images into encoded representations.
## Input types
### Required
- **`clip_vision`**
    - The CLIP vision model used for encoding the image. It is crucial for the encoding process, as it determines the method and quality of the encoding.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The image to be encoded. This input is essential for generating the encoded representation of the visual content.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`clip_vision_output`**
    - Comfy dtype: `CLIP_VISION_OUTPUT`
    - The encoded representation of the input image, produced by the CLIP vision model. This output is suitable for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [unCLIPConditioning](../../Comfy/Nodes/unCLIPConditioning.md)



## Source code
```python
class CLIPVisionEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "image": ("IMAGE",)
                             }}
    RETURN_TYPES = ("CLIP_VISION_OUTPUT",)
    FUNCTION = "encode"

    CATEGORY = "conditioning"

    def encode(self, clip_vision, image):
        output = clip_vision.encode_image(image)
        return (output,)

```
