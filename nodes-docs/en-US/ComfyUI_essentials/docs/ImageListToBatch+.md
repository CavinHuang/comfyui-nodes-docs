---
tags:
- Batch
- Image
- ImageBatch
---

# 🔧 Image List To Batch
## Documentation
- Class name: `ImageListToBatch+`
- Category: `essentials`
- Output node: `False`

The ImageListToBatch node is designed to transform a list of images into a batched tensor format, ensuring that all images conform to a uniform size through cropping and resizing operations. This process facilitates batch processing of images for neural network models, enhancing computational efficiency and consistency.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents a list of images to be batched together. It is crucial for batch processing, as it allows for the transformation of individual images into a uniform tensor format, enabling efficient processing by neural network models.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a batched tensor of images, where individual images have been resized and cropped to match a uniform size, suitable for further processing or model inference.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageListToBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    INPUT_IS_LIST = True
    CATEGORY = "essentials"

    def execute(self, image):
        shape = image[0].shape[1:3]
        out = []

        for i in range(len(image)):
            img = p(image[i])
            if image[i].shape[1:3] != shape:
                transforms = T.Compose([
                    T.CenterCrop(min(img.shape[2], img.shape[3])),
                    T.Resize((shape[0], shape[1]), interpolation=T.InterpolationMode.BICUBIC),
                ])
                img = transforms(img)
            out.append(pb(img))
            #image[i] = pb(transforms(img))

        out = torch.cat(out, dim=0)

        return (out,)

```
