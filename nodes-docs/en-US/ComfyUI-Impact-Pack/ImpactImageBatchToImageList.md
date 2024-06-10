---
tags:
- Batch
- Image
- ImageBatch
---

# Image batch to Image List
## Documentation
- Class name: `ImpactImageBatchToImageList`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to convert a batch of images into a list of individual images, facilitating operations that require handling images one at a time. It's particularly useful in workflows where images need to be processed or analyzed separately after being batch-processed.
## Input types
### Required
- **`image`**
    - The input parameter 'image' represents the batch of images to be split into individual images. It plays a crucial role in the node's operation by providing the data that will be decomposed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a list of individual images, each extracted from the input batch. This allows for further individual processing or analysis of each image.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [TilePreprocessor](../../comfyui_controlnet_aux/Nodes/TilePreprocessor.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class ImageBatchToImageList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",), }}

    RETURN_TYPES = ("IMAGE",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, image):
        images = [image[i:i + 1, ...] for i in range(image.shape[0])]
        return (images, )

```
