---
tags:
- Image
- Multimedia
---

# Random Image From Directory
## Documentation
- Class name: `SV_random`
- Category: `Clothing - SAL-VTON`
- Output node: `False`

The RandomImageFromDir node is designed to select a random image from a specified directory. This functionality is particularly useful for applications requiring variability and unpredictability in the selection of images, such as in data augmentation processes or when simulating diverse scenarios within a given context.
## Input types
### Required
- **`folder_path`**
    - Specifies the path to the directory from which a random image will be selected. This parameter is crucial for determining the pool of available images for random selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns a randomly selected image from the specified directory. This output is essential for introducing variability and randomness in the selection of images for further processing or display.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - Provides a mask associated with the randomly selected image, if applicable, to facilitate further image processing tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomImageFromDir:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "folder_path": ("STRING", {
                    "multiline": False,
                    "default": "./input"
                })
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"
    CATEGORY = node_category

    def load_image(self, folder_path):
        files = os.listdir(folder_path)
        image_extensions = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".ico", ".jfif"}
        images = [file for file in files if os.path.splitext(file)[1].lower() in image_extensions]

        random_image = os.path.join(folder_path, random.choice(images))
        img = Image.open(random_image)
        output_images = []
        output_masks = []
        # this is from load_image node. Lazy but works :')
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
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
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
    def IS_CHANGED(s, image):
        return float("NaN")

```
