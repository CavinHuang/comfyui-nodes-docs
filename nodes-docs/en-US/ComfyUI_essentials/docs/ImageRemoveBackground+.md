---
tags:
- BackgroundRemoval
- Image
---

# 🔧 Image Remove Background
## Documentation
- Class name: `ImageRemoveBackground+`
- Category: `essentials`
- Output node: `False`

This node is designed to remove the background from images, utilizing the rembg library to process each image in a batch and generate a corresponding mask for each image.
## Input types
### Required
- **`rembg_session`**
    - The session object for the rembg library, required for processing the images to remove their backgrounds.
    - Comfy dtype: `REMBG_SESSION`
    - Python dtype: `object`
- **`image`**
    - The input image or batch of images to have their backgrounds removed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The batch of images with their backgrounds removed.
    - Python dtype: `torch.tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - A mask or batch of masks corresponding to the removed backgrounds of the input images.
    - Python dtype: `torch.tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageRemoveBackground:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rembg_session": ("REMBG_SESSION",),
                "image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, rembg_session, image):
        from rembg import remove as rembg

        image = p(image)
        output = []
        for img in image:
            img = T.ToPILImage()(img)
            img = rembg(img, session=rembg_session)
            output.append(T.ToTensor()(img))

        output = torch.stack(output, dim=0)
        output = pb(output)
        mask = output[:, :, :, 3] if output.shape[3] == 4 else torch.ones_like(output[:, :, :, 0])

        return(output[:, :, :, :3], mask,)

```
