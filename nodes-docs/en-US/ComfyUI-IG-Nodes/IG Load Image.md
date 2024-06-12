---
tags:
- Image
- ImageLoad
---

# 📂 IG Load Image
## Documentation
- Class name: `IG Load Image`
- Category: `🐓 IG Nodes/IO`
- Output node: `False`

The IG Load Image node is designed for loading images from a specified directory, providing functionality to handle image preprocessing such as orientation correction, conversion to a specific color mode, and normalization. It abstracts the complexities of image loading and preprocessing, making it easier to integrate image data into workflows.
## Input types
### Required
- **`image_path`**
    - The 'image_path' parameter specifies the path to the image to be loaded. It plays a crucial role in determining which image file will be processed, affecting the node's execution and the resulting image data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' parameter represents the preprocessed image data, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The 'mask' parameter provides a mask for the loaded image, useful for operations that require segmentation or specific area processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_LoadImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_path": ("STRING", {"forceInput": True}),
            },
        }
    
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "main"

    CATEGORY = TREE_IO

    def main(self, image_path: str, **kwargs):
        img = Image.open(image_path)
        output_images = []
        output_masks = []
        for i in ImageSequence.Iterator(img):
            i = ImageOps.exif_transpose(i)
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            output_images.append(image)
            output_masks.append(mask.unsqueeze(0))

        if len(output_images) > 1:
            output_image = torch.cat(output_images, dim=0)
            output_mask = torch.cat(output_masks, dim=0)
        else:
            output_image = output_images[0]
            output_mask = output_masks[0]

        return (output_image, output_mask)
    
    @classmethod
    def IS_CHANGED(s, image_path: str, **kwargs):
        return is_changed_image(image_path, **kwargs)

```
